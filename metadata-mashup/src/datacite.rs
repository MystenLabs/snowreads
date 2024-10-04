pub fn datacite_get_abstract(json: &serde_json::Value) -> Option<&serde_json::Value> {
    json.get("attributes")
        .and_then(|v| v.get("descriptions"))
        .and_then(|v| v.as_array())
        .and_then(|descs| {
            descs
                .into_iter()
                .filter(|desc| {
                    desc.get("descriptionType")
                        .map(|dt| dt == "Abstract")
                        .unwrap_or(false)
                })
                .next()
        })
        .and_then(|v| v.get("description"))
}

pub fn datacite_take_descriptions(json: &mut serde_json::Value) -> Option<serde_json::Value> {
    json.get_mut("attributes")
        .and_then(|v| v.get_mut("descriptions"))
        .map(|v| v.take())
}
