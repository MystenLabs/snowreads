use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Categories {
    pub count: u64,
    pub size: u64,
    pub categories: Vec<ParentCategory>,
}


#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ParentCategory {
    pub name: String,
    pub count: u64,
    pub size: u64,
    pub sub_categories: Vec<ChildCategory>
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ChildCategory {
    pub name: String,
    pub count: u64,
    pub size: u64,
    pub data: String
}

