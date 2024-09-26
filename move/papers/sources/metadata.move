/// Module to handle the metadata of papers.
/// This can be used instead of a backend for storing metadata.
module papers::metadata;

use std::string::String;

use sui::dynamic_field;
use sui::object_table::{Self, ObjectTable};
use sui::table::{Self, Table};

use papers::auth::AdminCap;

use fun dynamic_field::add as UID.df_add;
use fun dynamic_field::remove as UID.df_remove;
use fun dynamic_field::exists_ as UID.df_exists;

/// Tried to add a metadata key that already exists.
const EMetadataKeyAlreadyExists: u64 = 0;
/// Tried to remove a metadata key that does not exist.
const EMetadataKeyDoesNotExist: u64 = 1;
/// Tried to add a paper that already exists.
const EPaperAlreadyExists: u64 = 2;
/// Registry state is inconsistent. Triggered during paper addition.
const EPaperAlreadyExistsUnexpected: u64 = 3;
/// Tried to remove a paper that does not exist.
const EPaperDoesNotExist: u64 = 4;
/// Registry state is inconsistent. Triggered during paper removal.
const EPaperDoesNotExistUnexpected: u64 = 5;

/// Metadata key for the Walrus Blob ID of a paper.
const WALRUS_BLOB_ID_METADATA_KEY: vector<u8> = b"walrus_blob_id";

/// Object to store any metadata a paper might have.
/// Uses dynamic fields to store any metadata by name.
public struct Metadata has key, store {
    id: UID
}

/// Dynamic field key for storing name-value metadata pairs.
public struct MetadataKey has copy, drop, store {
    name: String
}

/// Metadata Registry holds metadata of papers indexed by DOI.
/// Shared Object.
public struct MetadataRegistry has key {
    id: UID,
    /// DOI to published date.
    doi_to_date: Table<String, String>,
    /// DOI to metadata.
    doi_to_metadata: ObjectTable<String, Metadata>,
    /// Date to DOI. Used for ordering by published date.
    /// A service might fetch only specific days (eg. recent)
    date_to_dois: Table<String, Table<String, bool>>,
}

/// Admin can create a new metadata registry.
public fun new(_: &AdminCap, ctx: &mut TxContext): MetadataRegistry {
    MetadataRegistry {
        id: object::new(ctx),
        doi_to_date: table::new(ctx),
        doi_to_metadata: object_table::new(ctx),
        date_to_dois: table::new(ctx),
    }
}

/// MetadataRegistry is a Shared Object.
public fun share(registry: MetadataRegistry) {
    transfer::share_object(registry);
}

/// Admin can add a paper to the registry.
public fun add_paper(
    _: &AdminCap,
    registry: &mut MetadataRegistry,
    published_date: String,
    doi: String,
    blob_id: u256,
    ctx: &mut TxContext
) {
    if (!registry.date_to_dois.contains(published_date)) {
        registry.date_to_dois.add(published_date, table::new(ctx));
    };
    assert!(!registry.doi_to_date.contains(doi), EPaperAlreadyExists);
    assert!(!registry.doi_to_metadata.contains(doi), EPaperAlreadyExistsUnexpected);

    registry.date_to_dois[published_date].add(doi, false);
    registry.doi_to_date.add(doi, published_date);
    registry.doi_to_metadata.add(doi, Metadata{ id: object::new(ctx) });
    registry.doi_to_metadata[doi].add_metadata_internal(WALRUS_BLOB_ID_METADATA_KEY.to_string(), blob_id);
}

/// Admin can remove a paper from the registry.
public fun remove_paper(
    _: &AdminCap,
    registry: &mut MetadataRegistry,
    doi: String
// ): Metadata {
) {
    assert!(registry.doi_to_date.contains(doi), EPaperDoesNotExist);
    let published_date = registry.doi_to_date[doi];
    assert!(registry.date_to_dois[published_date].contains(doi), EPaperDoesNotExistUnexpected);
    assert!(registry.doi_to_metadata.contains(doi), EPaperDoesNotExistUnexpected);
    registry.date_to_dois[published_date].remove(doi);
    registry.doi_to_date.remove(doi);
    // registry.doi_to_metadata.remove(doi)
    let Metadata { id } = registry.doi_to_metadata.remove(doi);
    id.delete();
}

/// Admin can add metadata to a paper.
public fun add_metadata<V: store>(
    _: &AdminCap,
    registry: &mut MetadataRegistry,
    doi: String,
    metadata_key: String,
    metadata_value: V
) {
    assert!(registry.doi_to_date.contains(doi), EPaperDoesNotExist);
    let published_date = registry.doi_to_date[doi];
    assert!(registry.date_to_dois[published_date].contains(doi), EPaperDoesNotExistUnexpected);
    assert!(registry.doi_to_metadata.contains(doi), EPaperDoesNotExistUnexpected);
    registry.doi_to_metadata[doi].add_metadata_internal(metadata_key, metadata_value);
}

/// Admin can remove metadata from a paper.
public fun remove_metadata<V: store>(
    _: &AdminCap,
    registry: &mut MetadataRegistry,
    doi: String,
    metadata_key: String
): V {
    assert!(registry.doi_to_date.contains(doi), EPaperDoesNotExist);
    let published_date = registry.doi_to_date[doi];
    assert!(registry.date_to_dois[published_date].contains(doi), EPaperDoesNotExistUnexpected);
    assert!(registry.doi_to_metadata.contains(doi), EPaperDoesNotExistUnexpected);
    registry.doi_to_metadata[doi].remove_metadata_internal(metadata_key)
}

fun add_metadata_internal<V: store>(metadata: &mut Metadata, key: String, value: V) {
    assert!(!metadata.id.df_exists(MetadataKey{ name: key }), EMetadataKeyAlreadyExists);
    metadata.id.df_add(MetadataKey{ name: key }, value);
}

fun remove_metadata_internal<V: store>(metadata: &mut Metadata, key: String): V {
    assert!(metadata.id.df_exists(MetadataKey{ name: key }), EMetadataKeyDoesNotExist);
    metadata.id.df_remove(MetadataKey{ name: key })
}

