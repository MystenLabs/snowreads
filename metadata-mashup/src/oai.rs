pub fn oai_get_license(json: &serde_json::Value) -> Option<&serde_json::Value> {
    json.get("OAI-PMH")
        .and_then(|v| v.get("GetRecord"))
        .and_then(|v| v.get(0))
        .and_then(|v| v.get("record"))
        .and_then(|v| v.get(0))
        .and_then(|v| v.get("metadata"))
        .and_then(|v| v.get(0))
        .and_then(|v| v.get("arXiv"))
        .and_then(|v| v.get(0))
        .and_then(|v| v.get("license"))
}

pub fn oai_take_abtract(json: &mut serde_json::Value) -> Option<serde_json::Value> {
    json.get_mut("OAI-PMH")
        .and_then(|v| v.get_mut("GetRecord"))
        .and_then(|v| v.get_mut(0))
        .and_then(|v| v.get_mut("record"))
        .and_then(|v| v.get_mut(0))
        .and_then(|v| v.get_mut("metadata"))
        .and_then(|v| v.get_mut(0))
        .and_then(|v| v.get_mut("arXiv"))
        .and_then(|v| v.get_mut(0))
        .and_then(|v| v.get_mut("abstract"))
        .map(|v| v.take())
}
