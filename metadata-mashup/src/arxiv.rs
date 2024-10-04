pub fn arxiv_get_summary(json: &serde_json::Value) -> Option<&serde_json::Value> {
    json.get("entry").and_then(|v| v.get("summary"))
}

pub fn arxiv_take_summary(json: &mut serde_json::Value) -> Option<serde_json::Value> {
    json.get_mut("entry").and_then(|v| v.get_mut("summary")).map(|v| v.take())
}
