use std::env;
use std::fs::{self, File};
use std::io::{BufReader, BufWriter, Write};
use std::process::Command;

use add_paper::arxiv::Entry;
use add_paper::categories::Categories;
use add_paper::category::Category;
use add_paper::collections::{Collection, Collections, Paper};
use add_paper::oai::{OAIEntry, PaperVersion};
use chrono::{DateTime, Utc};
use clap::Parser;
use color_eyre::eyre::{eyre, OptionExt};
use color_eyre::Result;
use dotenvy::dotenv;
use serde::{Deserialize, Serialize, Serializer};
use tokio::io::BufWriter;
use xml2json_rs::JsonBuilder;

pub fn serialize_u64_as_string<S>(value: &u64, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    value.to_string().serialize(serializer)
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct AbsJson {
    id: String,
    title: String,
    authors: String,
    authors_parsed: Vec<Vec<String>>,
    versions: Vec<PaperVersion>,
    update_date: String,
    timestamp: u64,
    #[serde(rename = "abstract")]
    abstract_: String,
    subjects: Vec<String>,
    license: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    blob_id: Option<String>,
    #[serde(serialize_with = "serialize_u64_as_string")]
    pdf_size: u64,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
struct BlobIdResponse {
    pub blob_id: String,
    pub file: String,
    pub unencoded_length: u64,
}

fn get_blob_id(file_path: &str) -> Result<BlobIdResponse> {
    let output = Command::new("walrus")
        .args([
            "json",
            &format!(r#"'{{"command":{{"blobId":{{"file":"{file_path}"}}}}}}"#), // Use .arg to pass arguments
        ])
        .output()?;

    // Check if the command was successful
    if output.status.success() {
        Ok(serde_json::from_str(&String::from_utf8_lossy(
            &output.stdout,
        ))?)
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr).to_string();
        Err(eyre!(stderr))
    }
}

fn read_oai_json_file(file_path: &str) -> Result<Vec<OAIEntry>> {
    // Open the file
    let file = File::open(file_path)?;
    // Create a buffered reader
    let reader = BufReader::new(file);
    // Deserialize the JSON into a Vec<Item>
    let items: Vec<OAIEntry> = serde_json::from_reader(reader)?;
    Ok(items)
}

impl<'a> Into<Paper> for &'a AbsJson {
    fn into(self: &'a AbsJson) -> Paper {
        Paper {
            id: self.id.clone(),
            title: self.title.clone(),
            authors_parsed: self.authors_parsed.clone(),
            timestamp: self.timestamp.clone(),
            metadata_blob_id: None,
        }
    }
}

/// Add Paper
/// Fetches necessary metadata from
///     1. arXiv API
///     2. DataCite API
///     3. arXiv OAI API
/// and paper and stores them inside ../app/public/ directory
#[derive(Parser, Debug)]
#[command(name = "add-paper")]
struct Cli {
    #[arg(short = 'i', long = "id")]
    arxiv_id: String,
    #[arg(short = 'c', long = "collection")]
    collection: String,
}

#[tokio::main]
async fn main() -> Result<()> {
    dotenv().ok();
    let Cli {
        arxiv_id,
        collection: collection_name,
    } = Cli::parse();

    let pdf_directory = env::var("PDF_PATH").expect("PDF_PATH not found in .env");
    let abs_directory = env::var("ABS_PATH").expect("ABS_PATH not found in .env");
    let public_directory = env::var("PUBLIC_PATH").expect("PUBLIC_PATH not found in .env");
    let oai_json_metadata =
        env::var("OAI_JSON_METADATA").expect("OAI_JSON_METADATA not found in .env");

    // First download the file in case it doesn't exist:
    let file_path = format!("{pdf_directory}/{arxiv_id}.pdf");
    if fs::metadata(&file_path).is_err() {
        let pdf_bytes = reqwest::get(format!("https://arxiv.org/pdf/{arxiv_id}"))
            .await?
            .bytes()
            .await?;
        let file = File::create(file_path)?;
        let mut writer = BufWriter::new(file);
        writer.write_all(&pdf_bytes)?;
        writer.flush()?;
    }

    let arxiv_xml = reqwest::get(&format!(
        "http://export.arxiv.org/api/query?id_list={}",
        arxiv_id,
    ))
    .await?
    .text()
    .await?;

    let mut arxiv_entry = arxiv_xml
        .split("<entry>")
        .map(|s| "<entry>".to_string() + s)
        .skip(1)
        .next()
        .ok_or_eyre("No entry in arxiv response")?;
    let arxiv_entry_end = arxiv_entry
        .find("</entry>")
        .ok_or_eyre("No </entry> in arxiv response")?;
    arxiv_entry.truncate(arxiv_entry_end + "</entry>".len());
    let arxiv_entry = arxiv_entry;

    let mut arxiv_json = JsonBuilder::default().build_from_xml(&arxiv_entry)?;

    let entry = arxiv_json
        .get_mut("entry")
        .ok_or_eyre("No entry inside arxiv_json")?
        .take();

    let entry = serde_json::from_value::<Entry>(entry)?;
    let title = entry.title[0].clone();
    let authors = entry
        .author
        .iter()
        .map(|author| author.name[0].clone())
        .collect::<Vec<String>>();
    let authors = authors.join(", ");
    let primary_category = entry.primary_category[0].dollar_sign.term;
    let primary_category = serde_json::to_string(&primary_category)?;
    let mut categories = primary_category.split("--").map(|s| s.to_string());
    let parent_category = categories.next().ok_or_eyre("No parent category")?;
    let child_category = categories.next().ok_or_eyre("No child category")?;
    let mut parent_category = if parent_category.starts_with('"') {
        parent_category[1..].to_string()
    } else {
        parent_category
    };
    let child_category = if child_category.ends_with('"') {
        child_category[..child_category.len() - 1].to_string()
    } else {
        child_category
    };
    // Rename of Computing Research Repository
    if parent_category == "Computing Research Repository" {
        parent_category = "Computer Science".to_string()
    }
    println!("parent_category: {}", parent_category);
    println!("child_category: {}", child_category);

    // let pretty = serde_json::to_string_pretty(&arxiv_json)?;
    // println!("arxiv: {}", &pretty);

    // let oai_xml = reqwest::get(&format!(
    //     "http://export.arxiv.org/oai2?verb=GetRecord&identifier=oai:arXiv.org:{arxiv_id}&metadataPrefix=arXiv"
    //     )).await?
    //     .text()
    //     .await?;

    let items: Vec<OAIEntry> = read_oai_json_file(&oai_json_metadata)?;

    let oai_json = items
        .into_iter()
        .find(|item| item.id == arxiv_id)
        .ok_or_eyre("Id not found inside oai json metadata")?;
    let authors_parsed = oai_json.authors_parsed;

    let versions = oai_json.versions;
    let update_date = oai_json.update_date.unwrap_or("".to_string());
    let subjects = oai_json.categories.split(" ").map(|s| s.to_string());
    let subjects = subjects
        .map(|s| {
            println!("{}", s);
            serde_json::from_str::<Category>(&format!("\"{s}\""))
                .map_err(|e| eyre!("Could not parse category: {}", e))
        })
        .collect::<Result<Vec<Category>>>()?;
    let subjects = subjects
        .into_iter()
        .map(|cat| {
            let cat_str = serde_json::to_string(&cat)
                .map_err(|e| eyre!("Could not serialize category: {}", e))?;
            let mut replaced = cat_str.replace("--", "/");
            if replaced.starts_with('"') {
                replaced = replaced[1..].to_string();
            }
            if replaced.ends_with('"') {
                replaced = replaced[..replaced.len() - 1].to_string();
            }

            Ok(replaced)
        })
        .collect::<Result<Vec<String>>>()?;

    let published_date = versions
        .iter()
        .find(|version| version.version.as_str() == "v1")
        .ok_or_eyre("No v1")?;
    let published_date =
        DateTime::parse_from_rfc2822(published_date.created.as_str())?.with_timezone(&Utc);
    let timestamp = published_date.timestamp_millis() as u64;
    println!("timestamp: {}", timestamp);
    let abstract_ = oai_json.abstract_;
    let license = oai_json
        .license
        .expect(&format!("Did not find license for paper {arxiv_id}"));

    let pdf_file_path = format!("{pdf_directory}/{arxiv_id}.pdf");
    let blob_id = get_blob_id(&pdf_file_path)?.blob_id;
    let pdf_size = std::fs::metadata(pdf_file_path)?.len();
    let abs_json = AbsJson {
        id: arxiv_id.clone(),
        title,
        authors,
        authors_parsed,
        versions,
        update_date,
        timestamp,
        abstract_,
        subjects,
        license,
        blob_id: Some(blob_id),
        pdf_size,
    };

    // Store abs
    let file_path = format!("{abs_directory}/{}.json", abs_json.id);
    let file = File::create(&file_path)?;
    let mut writer = BufWriter::new(file);
    serde_json::to_writer(&mut writer, &abs_json)?;
    writer.flush()?;
    let metadata_blob_id = get_blob_id(&file_path)?.blob_id;

    let file = File::open(format!("{public_directory}/collections.json"))?;
    let mut collections: Collections = serde_json::from_reader(BufReader::new(file))?;

    if !collections.collections.contains_key(&collection_name) {
        collections
            .collections
            .insert(collection_name.clone(), Collection::default());
    }
    let collection = collections.collections.get_mut(&collection_name).unwrap();

    let mut paper: Paper = (&abs_json).into();
    paper.metadata_blob_id = Some(metadata_blob_id);

    let new = collection.papers.insert(paper.clone());
    if new {
        println!("Adding paper to collections.json...");
        collection.count += 1;
        collection.size += abs_json.pdf_size;
        collections.size += abs_json.pdf_size;
        let file = File::create(format!("{public_directory}/new_collections.json"))?;
        let mut writer = BufWriter::new(file);
        serde_json::to_writer(&mut writer, &collections)?;
        writer.flush()?;

        fs::remove_file(format!("{public_directory}/collections.json"))?;
        fs::rename(
            format!("{public_directory}/new_collections.json"),
            format!("{public_directory}/collections.json"),
        )?;
    } else {
        println!("Paper already in collections.json");
    }

    let file = File::open(format!("{public_directory}/papers.json"))?;
    let mut categories_json: Categories = serde_json::from_reader(BufReader::new(file))?;

    let parent_category = categories_json
        .categories
        .iter_mut()
        .find(|cat| cat.name == parent_category)
        .ok_or_eyre("Parent category not found in papers.json")?;
    // .find(|p_cat| {
    //     false
    // })
    //     p_cat.
    // .get_mut(&parent_category)
    let child_category = parent_category
        .sub_categories
        .iter_mut()
        .find(|sub_cat| sub_cat.name == child_category)
        .ok_or_eyre("Child category not found in papers.json")?;

    let sub_cat_path = format!(
        "{public_directory}/{}/{}.json",
        parent_category.name, child_category.name
    );
    let sub_cat_file = File::open(sub_cat_path.clone())?;
    let mut papers: Vec<Paper> = serde_json::from_reader(BufReader::new(sub_cat_file))?;
    if papers.iter().find(|paper| paper.id == arxiv_id).is_some() {
        println!("Paper already exists in papers.json");
        return Ok(());
    }
    println!("Updating papers.json...");
    papers.push(paper);
    let new_sub_cat_path = format!(
        "{public_directory}/{}/{}_new.json",
        parent_category.name, child_category.name
    );
    let new_sub_cat_file = File::create(new_sub_cat_path.clone())?;
    let mut writer = BufWriter::new(new_sub_cat_file);
    serde_json::to_writer(&mut writer, &papers)?;
    writer.flush()?;
    child_category.count += 1;
    child_category.size += abs_json.pdf_size;
    parent_category.count += 1;
    parent_category.size += abs_json.pdf_size;
    categories_json.count += 1;
    categories_json.size += abs_json.pdf_size;
    let file = File::create(format!("{public_directory}/new_papers.json"))?;
    let mut writer = BufWriter::new(file);
    serde_json::to_writer(&mut writer, &categories_json)?;
    writer.flush()?;

    fs::remove_file(sub_cat_path.clone())?;
    fs::rename(new_sub_cat_path, sub_cat_path)?;

    fs::remove_file(format!("{public_directory}/papers.json"))?;
    fs::rename(
        format!("{public_directory}/new_papers.json"),
        format!("{public_directory}/papers.json"),
    )?;

    Ok(())
}
