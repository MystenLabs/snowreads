use std::collections::{HashMap, HashSet};

use color_eyre::{eyre::eyre, Result};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Categories {
    pub count: u64,
    pub size: u64,
    #[serde(flatten)]
    pub parent_categories: HashMap<String, ParentCategory>,
}


#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ParentCategory {
    pub count: u64,
    pub size: u64,
    #[serde(flatten)]
    pub child_categories: HashMap<String, ChildCategory>
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ChildCategory {
    pub count: u64,
    pub size: u64,
    pub papers: HashSet<Paper>
}

#[derive(Debug, Clone, Deserialize, Serialize, Hash)]
#[serde(rename_all = "camelCase")]
pub struct Paper {
    pub id: String,
    pub title: String,
    pub authors_parsed: Vec<Vec<String>>,
    pub timestamp: u64,
    pub metadata_blob_id: Option<String>
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct WalrusBlobIdResp {
    blob_id: String,
    file: String,
    unencoded_length: u64,
}

impl Paper {
    pub fn replace_blob_id(&mut self, path: String) -> Result<Option<String>> {


    let json_arg = format!(r#"{{"command":{{"blobId":{{"file":"{path}"}}}}}}"#);
    let output = std::process::Command::new("walrus")
        .arg("json")
        .arg(json_arg)
        .output()
        .expect("Failed to execute walrus json blob-id");
    if !output.status.success() {
        let error = String::from_utf8_lossy(&output.stderr);
        println!("{error}");
        return Err(eyre!("{}", error))
    }

    let walrus_resp = String::from_utf8_lossy(&output.stdout);
    let blob_id = serde_json::from_str::<WalrusBlobIdResp>(&walrus_resp)
        .expect("Failed to parse walrus_resp")
        .blob_id;

        Ok(self.metadata_blob_id.replace(blob_id))
    }
}

impl PartialEq for Paper {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Eq for Paper {}
