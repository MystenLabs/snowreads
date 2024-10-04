
mod fetches;
pub use fetches::Metadata;
pub use fetches::fetch_arxiv_api;
pub use fetches::fetch_datacite_api;
pub use fetches::fetch_oai_api;

pub mod arxiv;
pub mod datacite;
pub mod oai;
