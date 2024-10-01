pub fn arxiv_get_summary(json: &serde_json::Value) -> Option<&serde_json::Value> {
    json.get("entry").and_then(|v| v.get("summary"))
}
