use std::collections::HashMap;
use std::env;
use std::fs::File;
use std::io::{BufReader, BufWriter, Write};

use color_eyre::Result;
use dotenvy::dotenv;
use remove_public_abs::categories::Categories;
use serde::{Deserialize, Serialize, Serializer};

pub fn serialize_u64_as_string<S>(value: &u64, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    value.to_string().serialize(serializer)
}

pub fn serialize_option_u64_as_string<S>(
    value: &Option<u64>,
    serializer: S,
) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    match value {
        Some(v) => serializer.serialize_some(&v.to_string()),
        None => serializer.serialize_none(),
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
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
    #[serde(
        skip_serializing_if = "Option::is_none",
        serialize_with = "serialize_option_u64_as_string"
    )]
    end_epoch: Option<u64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    object_id: Option<String>,
    #[serde(
        skip_serializing_if = "Option::is_none",
        serialize_with = "serialize_option_u64_as_string"
    )]
    registered_epoch: Option<u64>,
    #[serde(
        skip_serializing_if = "Option::is_none",
        serialize_with = "serialize_option_u64_as_string"
    )]
    certified_epoch: Option<u64>,
    #[serde(
        skip_serializing_if = "Option::is_none",
        serialize_with = "serialize_option_u64_as_string"
    )]
    start_epoch: Option<u64>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct PaperVersion {
    pub version: String,
    pub created: String,
}
/// Add Paper
/// Fetches necessary metadata from
///     1. arXiv API
///     2. DataCite API
///     3. arXiv OAI API
/// and paper and stores them inside ../app/public/ directory
// #[derive(Parser, Debug)]
// #[command(name = "add-paper")]
// struct Cli {
//     #[arg(short = 'i', long = "id")]
//     arxiv_id: String,
//     #[arg(short = 'c', long = "collection")]
//     collection: String,
// }

#[tokio::main]
async fn main() -> Result<()> {
    dotenv().ok();
    // let Cli {
    //     arxiv_id,
    //     collection: collection_name,
    // } = Cli::parse();
    let abs_directory = env::var("ABS_PATH").expect("ABS_PATH not found in .env");
    let public_path = env::var("PUBLIC_PATH").expect("PUBLIC_PATH not found in .env");

    let file = File::open(format!("{public_path}/papers.json"))?;
    let mut categories: Categories = serde_json::from_reader(BufReader::new(file))?;

    let mut index = HashMap::new();
    for (_parent_name, parent_category) in categories.parent_categories.iter_mut() {
        for (_child_name, child_category) in parent_category.child_categories.iter_mut() {

            let mut new_papers = vec![];
            for paper in child_category.papers.iter() {
                let mut new_paper = paper.clone();
                let should_be_none = new_paper.replace_blob_id(format!("{abs_directory}/{}.json", paper.id));
                if should_be_none.is_some() {
                    println!("Replaced previous blob_id: {} with blob_id: {}", should_be_none.unwrap(), new_paper.metadata_blob_id.as_ref().unwrap());
                }
                index.insert(paper.id.clone(), new_paper.metadata_blob_id.clone().unwrap());
                new_papers.push(new_paper);
            }
            for paper in new_papers {
                child_category.papers.replace(paper.clone());
            }
        }
    }

    // Add an extra json
    let new_papers_path = public_path.clone() + "/new_papers.json";
    let file = File::create(new_papers_path)?;
    let mut writer = BufWriter::new(file);
    serde_json::to_writer(&mut writer, &categories)?;
    writer.flush()?;

    let index_path = public_path + "/index.json";
    let file = File::create(index_path)?;
    let mut writer = BufWriter::new(file);
    serde_json::to_writer(&mut writer, &index)?;
    writer.flush()?;

    Ok(())
}
