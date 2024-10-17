use std::collections::{HashMap, HashSet};

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Collections {
    pub size: u64,
    #[serde(flatten)]
    pub collections: HashMap<String, Collection>,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Collection {
    pub size: u64,
    pub count: u32,
    pub papers: HashSet<Paper>,
}

#[derive(Debug, Clone, Deserialize, Serialize, Hash)]
#[serde(rename_all = "camelCase")]
pub struct Paper {
    pub id: String,
    pub title: String,
    pub authors_parsed: Vec<Vec<String>>,
    pub timestamp: u64,
}

impl PartialEq for Paper {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Eq for Paper {}
