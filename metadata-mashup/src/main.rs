use std::collections::HashMap;

use clap::{arg, Parser};
use color_eyre::eyre::eyre;
use color_eyre::Result;
use metadata_mashup::{fetch_arxiv_api, fetch_datacite_api, fetch_oai_api, Metadata};

const DEFAULT_RETRY_ATTEMPTS: &str = "5";
const DEFAULT_RETRY_DELAY_MS: &str = "5000";

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
    #[arg(long, value_delimiter = ',')]
    arxiv_ids: Vec<String>,
    /// The output JSON filename.
    #[arg(short, long)]
    out_json: String,
    /// Batch size for the arXiv and DataCite APIs.
    #[arg(long, default_value = "10")]
    batch_size: usize,
    /// Number of retry attempts for each API call.
    #[arg(long, default_value = DEFAULT_RETRY_ATTEMPTS)]
    retry_attempts: usize,
    #[arg(long, default_value = DEFAULT_RETRY_DELAY_MS)]
    retry_delay_ms: usize,
}

#[tokio::main]
async fn main() -> Result<()> {
    dotenvy::dotenv().ok();
    tracing_subscriber::fmt::fmt()
        .with_ansi(false)
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let Cli {
        arxiv_ids,
        out_json,
        batch_size,
        retry_attempts,
        retry_delay_ms,
    } = Cli::parse();

    // DataCite API starts paginating at 25
    assert!(batch_size <= 25, "Batch size must be <= 25");

    // Split arxiv_ids to batches of size `args.batch_size`
    let mut arxiv_batches = vec![];
    for chunk in arxiv_ids.chunks(batch_size) {
        arxiv_batches.push(chunk.to_owned());
    }

    // let mut tasks = vec![];
    for (i, batch) in arxiv_batches.into_iter().enumerate() {
        let batch = batch.clone();
        // tasks.push(tokio::spawn(async move {
        let arxiv_jsons = match fetch_arxiv_api(batch.as_slice(), retry_attempts, retry_delay_ms).await {
            Ok(jsons) => jsons,
            Err(e) => {
                tracing::error!("Error fetching arXiv metadata for arXiv IDs {:?}: {}", batch, e);
                batch.iter().map(|id| {
                    let mut error_json = serde_json::Map::new();
                    error_json.insert("error".to_string(), serde_json::Value::String(e.to_string()));
                    (id.clone(), serde_json::Value::Object(error_json))
                }).collect()
            }
        };

        let datacite_jsons = match
            fetch_datacite_api(batch.as_slice(), retry_attempts, retry_delay_ms).await {
            Ok(jsons) => jsons,
            Err(e) => {
                tracing::error!("Error fetching DataCite metadata for arXiv IDs {:?}: {}", batch, e);
                batch.iter().map(|id| {
                    let mut error_json = serde_json::Map::new();
                    error_json.insert("error".to_string(), serde_json::Value::String(e.to_string()));
                    (id.clone(), serde_json::Value::Object(error_json))
                }).collect()
            }
        };

        let mut oai_jsons = vec![];
        for id in batch {
            let json_metadata = match fetch_oai_api(id.as_str(), retry_attempts, retry_delay_ms).await {
                Ok(json) => json,
                Err(e) => {
                    tracing::error!("Error fetching OAI metadata for arXiv ID {}: {}", id, e);
                    let mut error_json = serde_json::Map::new();
                    error_json.insert("error".to_string(), serde_json::Value::String(e.to_string()));
                    serde_json::Value::Object(error_json)
                }
            };
            oai_jsons.push((id, json_metadata));
        }

        let mut hash_map: HashMap<String, Metadata> = HashMap::new();
        arxiv_jsons.into_iter().for_each(|(id, json)| {
            let metadata = Metadata {
                arxiv_id: id.clone(),
                arxiv: Some(json),
                datacite: None,
                oai: None,
            };
            hash_map.insert(id, metadata);
        });
        datacite_jsons.into_iter().try_for_each(|(id, json)| {
            hash_map
                .get_mut(&id)
                .ok_or(eyre!("No arXiv metadata for id {}", id))?
                .datacite = Some(json);
            Ok::<(), color_eyre::eyre::Error>(())
        })?;
        oai_jsons.into_iter().try_for_each(|(id, json)| {
            hash_map
                .get_mut(&id)
                .ok_or(eyre!("No arXiv metadata for id {}", id))?
                .oai = Some(json);
            Ok::<(), color_eyre::eyre::Error>(())
        })?;

        let json = serde_json::to_string_pretty(&hash_map)?;
        std::fs::write(out_json.clone() + &format!("_{}.json", i), json)?;
    }

    Ok(())
}
