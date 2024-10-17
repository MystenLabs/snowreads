use std::collections::{HashMap, HashSet};

use serde::{Deserialize, Serialize};

use crate::collections::Paper;

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

