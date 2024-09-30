use clap::{arg, Parser};
use color_eyre::Result;
use futures::future;
use metadata_mashup::{fetch_arxiv_api, fetch_datacite_api, fetch_oai_api};
use serde_json::Value;
use tracing::{error, info};

const DEFAULT_RETRY_ATTEMPTS: &str = "3";
const DEFAULT_RETRY_DELAY_MS: &str = "1000";

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
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let Cli {
        arxiv_ids,
        out_json,
        batch_size,
        retry_attempts,
        retry_delay_ms,
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
            // (identifiers.identifier:2011.08688%20AND%20identifiers.identifierType:arXiv)OR(identifiers.identifier:2408.00001%20AND%20identifiers.identifierType:arXiv)

            // For some reason rust doesn't allow us to use the `?` operator here
            // let arxiv_xml = arxiv_xml_res?;

            let arxiv_jsons =
                fetch_arxiv_api(batch.as_slice(), retry_attempts, retry_delay_ms).await?;

            let datacite_jsons =
                fetch_datacite_api(batch.as_slice(), retry_attempts, retry_delay_ms).await?;

            let mut oai_jsons = vec![];
            for id in batch {
                let json_metadata =
                    fetch_oai_api(id.as_str(), retry_attempts, retry_delay_ms).await?;
                oai_jsons.push((id, json_metadata));
            }

            Ok::<
                (
                    Vec<(String, Value)>,
                    Vec<(String, Value)>,
                    Vec<(String, Value)>,
                ),
                color_eyre::eyre::Error,
            >((arxiv_jsons, datacite_jsons, oai_jsons))
        }));
    }

    let results = future::join_all(tasks).await;
    for res in results.into_iter() {
        let (arxivs, datacites, oais) = res??;
        println!("arXiv XMLs:");
        for arxiv in arxivs {
            println!("arXiv XML: {}: {:#?}", arxiv.0, arxiv.1);
        }
        println!("DataCite JSON:");
        for datacite in datacites {
            println!("DataCite JSON: {}: {:#?}", datacite.0, datacite.1);
        }
        println!("OAI XMLs:");
        for oai in oais {
            println!("OAI XML: {}: {:#?}", oai.0, oai.1);
        }
    }

    Ok(())
}
