use color_eyre::{eyre::eyre, Result};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tracing::{error, warn};
use xml2json_rs::JsonBuilder;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Metadata {
    pub arxiv_id: String,
    pub arxiv: Option<Value>,
    pub datacite: Option<Value>,
    pub oai: Option<Value>,
}

pub async fn fetch_arxiv_api(
    batch: &[String], // Not exactly idiomatic by vec_str.map(|s| s.as_str()).collect::<Vec<&str>>().as_slice() is ugly
    retry_attempts: usize,
    retry_delay_ms: usize,
) -> Result<Vec<(String, Value)>> {
    let arxiv_api_ids = batch.join(",");

    let mut arxiv_resp: Result<String> = Err(eyre!(""));
    for _ in 0..=retry_attempts {
        let response = reqwest::get(&format!(
            "http://export.arxiv.org/api/query?id_list={}&max_results={}",
            arxiv_api_ids,
            batch.len()
        ))
        .await
        .map_err(|e| eyre!("Error fetching arXiv XML for ids {:#?}: {}", batch, e));

        arxiv_resp = match response {
            Ok(resp) => resp
                .text()
                .await
                .map_err(|e| eyre!("Error parsing arXiv text for ids {:#?}: {}", batch, e)),
            Err(e) => Err(e),
        };

        if arxiv_resp.is_ok() {
            break;
        }

        warn!("{}", arxiv_resp.as_ref().unwrap_err());
        warn!(
            "Retrying arXiv XML fetch for ids {:#?} in {} ms",
            batch, retry_delay_ms
        );
        tokio::time::sleep(tokio::time::Duration::from_millis(retry_delay_ms as u64)).await;
    }
    let arxiv_xml = match arxiv_resp {
        Ok(xml) => xml,
        Err(e) => {
            error!("Failed to fetch arXiv XML for ids {:#?}:\nError: {}", batch, e);
            return Err(e);
        }
    };

    // Split arXiv XMLs by <entry> tag and Datacite JSON by array elements
    let mut arxiv_xmls = arxiv_xml
        .split("<entry>")
        .map(|s| "<entry>".to_string() + s)
        .skip(1) // Skip first non entry
        .collect::<Vec<String>>();
    // Remove everything after </entry> from the last entry
    let last_entry = arxiv_xmls.last_mut().ok_or(eyre!("No last entry"))?;
    let last_entry_end = last_entry
        .find("</entry>")
        .ok_or(eyre!("No </entry> in last entry"))?;
    last_entry.truncate(last_entry_end + "</entry>".len());

    arxiv_xmls
        .into_iter()
        .map(|xml| {
            let json_builder = JsonBuilder::default(); // Not really sure if we need to create
                                                       // a new JsonBuilder for each XML, but
                                                       // keeping it safe for now.
            let json_str = json_builder
                .build_string_from_xml(&xml)
                .map_err(|e| eyre!(e))?;
            let json = serde_json::from_str::<Value>(&json_str)?;
            let ids = json
                .get("entry")
                .ok_or(eyre!("No entry in arXiv JSON metadata"))?
                .get("id")
                .ok_or(eyre!("No entry.id in arXiv JSON metadata"))?
                .as_array()
                .ok_or(eyre!("entry.id is not an array"))?;

            if ids.len() > 1 {
                return Err(eyre!("entry.id has more than one element"));
            }

            let Value::String(arxiv_id) = ids
                .first()
                .ok_or(eyre!("No entry.id[0] in arXiv JSON metadata"))?
            else {
                return Err(eyre!("Unexpected type for entry.id in arXiv JSON metadata"));
            };
            let arxiv_id = arxiv_id
                .split("/")
                .last()
                .ok_or(eyre!("arXiv API: Split at '/' did not have a last element"))?
                .split("v")
                .next()
                .ok_or(eyre!(
                    "arXiv API: Split at 'v' did not have a first element"
                ))?
                .to_string();
            Ok((arxiv_id, json))
        })
        .collect::<Result<Vec<(String, Value)>>>()
}

pub async fn fetch_datacite_api(
    batch: &[String], // Not exactly idiomatic by vec_str.map(|s| s.as_str()).collect::<Vec<&str>>().as_slice() is ugly
    retry_attempts: usize,
    retry_delay_ms: usize,
) -> Result<Vec<(String, Value)>> {
    let datacite_api_ids = if batch.len() > 1 {
        "(identifiers.identifier:".to_string()
            + &batch.join("%20AND%20identifiers.identifierType:arXiv)OR(identifiers.identifier:")
            + "%20AND%20identifiers.identifierType:arXiv)"
    } else {
        "identifiers.identifier:".to_string()
            + batch.first().ok_or(eyre!("Empty batch"))?
            + "%20AND%20identifiers.identifierType:arXiv"
    };

    let mut datacite_resp: Result<String> = Err(eyre!(""));
    for _ in 0..=retry_attempts {
        let response = reqwest::get(&format!(
            "https://api.datacite.org/dois?query={datacite_api_ids}"
        ))
        .await
        .map_err(|e| eyre!("Error fetching DataCite JSON for ids {:#?}: {}", batch, e));

        datacite_resp = match response {
            Ok(resp) => resp
                .text()
                .await
                .map_err(|e| eyre!("Error parsing DataCite text for ids {:#?}: {}", batch, e)),
            Err(e) => Err(e),
        };

        if datacite_resp.is_ok() {
            break;
        }

        warn!("{}", datacite_resp.as_ref().unwrap_err());
        warn!(
            "Retrying DataCite JSON fetch for ids {:#?} in {} ms",
            batch, retry_delay_ms
        );
        tokio::time::sleep(tokio::time::Duration::from_millis(retry_delay_ms as u64)).await;
    }
    let datacite_json = match datacite_resp {
        Ok(json) => json,
        Err(e) => {
            error!("Failed to fetch DataCite JSON for ids {:#?}:\nError: {}", batch, e);
            return Err(e);
        }
    };

    println!("{}", datacite_json);
    let Value::Array(entries) = serde_json::from_str::<serde_json::Value>(&datacite_json)
        .map_err(|e| eyre!("Error parsing DataCite JSON for ids {:#?}: {}", batch, e))?
        .get_mut("data")
        .map(|v| v.take())
        .ok_or(eyre!("No data in DataCite JSON metadata"))?
    else {
        return Err(eyre!("Unexpected type for data in DataCite JSON metadata"));
    };
    entries
        .into_iter()
        .map(|entry| {
            let identifier = entry
                .get("attributes")
                .ok_or(eyre!("No data.attributes in DataCite JSON metadata"))?
                .get("identifiers")
                .ok_or(eyre!("No data.attributes.identifiers in DataCite JSON metadata"))?
                .as_array()
                .ok_or(eyre!("data.attributes.identifiers is not an array"))?
                .iter()
                .find(|identifier| {
                    identifier
                        .get("identifierType")
                        .map(|identifier_type| identifier_type == "arXiv")
                        .unwrap_or(false)
                })
                .ok_or(eyre!("No data.attributes.identifiers[identifierType:arXiv] in DataCite JSON metadata"))?
                .get("identifier")
                .ok_or(eyre!("No data.attributes.identifiers[identifierType:arXiv].identifier in DataCite JSON metadata"))?
                .as_str()
                .ok_or(eyre!("Unexpected type for data.attributes.identifiers[identifierType:arXiv].identifier"))?;

                Ok((identifier.to_string(), entry))
        })
        .collect::<Result<Vec<(String, Value)>>>()
}

pub async fn fetch_oai_api(
    id: &str,
    retry_attempts: usize,
    retry_delay_ms: usize,
) -> Result<Value> {
    let mut oai_resp: Result<String> = Err(eyre!(""));
    for _ in 0..=retry_attempts {
        // http://export.arxiv.org/oai2?verb=GetRecord&identifier=oai:arXiv.org:2011.08688&metadataPrefix=arXiv
        let response = reqwest::get(&format!("http://export.arxiv.org/oai2?verb=GetRecord&identifier=oai:arXiv.org:{id}&metadataPrefix=arXiv"))
                    .await
                    .map_err(|e| eyre!("Error fetching OAI XML for id {}: {}", id, e));

        oai_resp = match response {
            Ok(resp) => resp
                .text()
                .await
                .map_err(|e| eyre!("Error parsing OAI text for id {}: {}", id, e)),
            Err(e) => Err(e),
        };

        if oai_resp.is_ok() {
            break;
        }

        warn!("{}", oai_resp.as_ref().unwrap_err());
        warn!(
            "Retrying OAI XML fetch for id {} in {} ms",
            id, retry_delay_ms
        );
        tokio::time::sleep(tokio::time::Duration::from_millis(retry_delay_ms as u64)).await;
    }
    let oai_resp = match oai_resp {
        Ok(xml) => xml,
        Err(e) => {
            error!("Failed to fetch OAI xml for id {}:\nError: {}", id, e);
            return Err(e)
        },
    };
    let json_builder = JsonBuilder::default();
    let json_str = json_builder
        .build_string_from_xml(&oai_resp)
        .map_err(|e| eyre!(e))?;
    serde_json::from_str::<serde_json::Value>(&json_str)
        .map_err(|e| eyre!("Error parsing OAI JSON for id {}: {}", id, e))
}
