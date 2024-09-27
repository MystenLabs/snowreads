use clap::{arg, Parser};
use color_eyre::{eyre::eyre, Result};
use futures::future;
use xml2json_rs::JsonBuilder;

/// Metadata Mashup
/// Fetches arXiv paper metadata from
///     1. arXiv API
///     2. DataCite API
///     3. arXiv OAI API
/// and combines them into a single JSON file.
#[derive(Parser, Debug)]
#[command(name = "metadata-mashup")]
struct Cli {
    /// The arXiv IDs of the papers to fetch metadata for.
    /// Multiple IDs can be provided separated by commas.
    #[arg(long, value_delimiter=',')]
    arxiv_ids: Vec<String>,
    /// The output JSON filename.
    #[arg(short, long)]
    out_json: String,
    /// Batch size for the arXiv and DataCite APIs.
    #[arg(long, default_value = "10")]
    batch_size: usize,
}

#[tokio::main]
async fn main() -> Result<()> {
    let Cli {
        arxiv_ids,
        out_json,
        batch_size,
    } = Cli::parse();

    // Split arxiv_ids to batches of size `args.batch_size`
    let mut arxiv_batches = vec![];
    for chunk in arxiv_ids.chunks(batch_size) {
        arxiv_batches.push(chunk.to_owned());
    }

    let mut tasks = vec![];
    for batch in arxiv_batches.into_iter() {
        let batch = batch.clone();
        tasks.push(tokio::spawn(async move {
            let arxiv_api_ids = batch.join(",");
            // (identifiers.identifier:2011.08688%20AND%20identifiers.identifierType:arXiv)OR(identifiers.identifier:2408.00001%20AND%20identifiers.identifierType:arXiv)
            let datacite_api_ids = if batch.len() > 1 {
                "(identifiers.identifier:".to_string()
                + &batch.join("%20AND%20identifiers.identifierType:arXiv)OR(identifiers.identifier:")
                + "%20AND%20identifiers.identifierType:arXiv)"
            } else {
                "identifiers.identifier:".to_string() + &batch.first().ok_or(eyre!("Empty batch"))? + "%20AND%20identifiers.identifierType:arXiv"
            };

            let arxiv_xml =
                reqwest::get(&format!("http://export.arxiv.org/api/query?id_list={}&max_results={}", arxiv_api_ids, batch_size))
                    .await?
                    .text()
                    .await?;
            let datacite_json = reqwest::get(&format!("https://api.datacite.org/dois?query={datacite_api_ids}"))
                .await?
                .text()
                .await?;
            let mut oai_xmls = vec![];
            for id in batch {
                // http://export.arxiv.org/oai2?verb=GetRecord&identifier=oai:arXiv.org:2011.08688&metadataPrefix=arXiv
                oai_xmls.push(reqwest::get(&format!("http://export.arxiv.org/oai2?verb=GetRecord&identifier=oai:arXiv.org:{id}&metadataPrefix=arXiv"))
                    .await?
                    .text()
                    .await?
                );
            }
            // Split arXiv XMLs by <entry> tag and Datacite JSON by array elements
            let mut arxiv_xmls = arxiv_xml.split("<entry>").map(|s| {
                "<entry>".to_string() + s
            }).skip(1)  // Skip first non entry
            .collect::<Vec<String>>();
            // Remove everything after </entry> from the last entry
            let last_entry = arxiv_xmls.last_mut().ok_or(eyre!("No last entry"))?;
            let last_entry_end = last_entry.find("</entry>").ok_or(eyre!("No </entry> in last entry"))?;
            last_entry.truncate(last_entry_end + "</entry>".len());

            let json_value = serde_json::from_str::<serde_json::Value>(&datacite_json)?;
            let data = json_value["data"].as_array().ok_or(eyre!("Data is not an array"))?;
            let datacite_jsons = data.iter().map(|d| {
                serde_json::to_string_pretty(d).unwrap()
            }).collect::<Vec<String>>();

            // Convert XMLs to JSON
            let arxiv_jsons = arxiv_xmls.into_iter().map(|xml| {
                let json_builder = JsonBuilder::default(); // Not really sure if we need to create
                                                           // a new JsonBuilder for each XML, but
                                                           // keeping it safe for now.
                json_builder.build_string_from_xml(&xml).map_err(|e| eyre!(e))
            }).collect::<Result<Vec<String>>>()?;

            let oai_jsons = oai_xmls.into_iter().map(|xml| {
                let json_builder = JsonBuilder::default();
                json_builder.build_string_from_xml(&xml).map_err(|e| eyre!(e))
            }).collect::<Result<Vec<String>>>()?;




            Ok::<(Vec<String>, Vec<String>, Vec<String>), color_eyre::eyre::Error>((arxiv_jsons, datacite_jsons, oai_jsons))
        }));
    }

    let results = future::join_all(tasks).await;
    for res in results.into_iter() {
        let (arxiv_xmls, datacite_json, oai_xmls) = res??;
        println!("arXiv XMLs:");
        for arxiv_xml in arxiv_xmls {
            println!("arXiv XML: {}", arxiv_xml);
        }
        println!("DataCite JSON:");
        for datacite_json in datacite_json {
            println!("DataCite JSON: {}", datacite_json);
        }
        println!("OAI XMLs:");
        for oai_xml in oai_xmls {
            println!("OAI XML: {}", oai_xml);
        }
    }

    Ok(())
}
