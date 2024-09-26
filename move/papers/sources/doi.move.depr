/// Holds the relationship between article DOIs and the walrus blob they are 
/// stored in.
module papers::doi;
use std::string::String;

use sui::table::{Self, Table};

use papers::auth::AdminCap;

/// The registry holds the relationship between article DOIs and the walrus blob
/// they are stored in. Shared object.
public struct DoiRegistry has key {
    id: UID,
    dois_to_blob_ids: Table<String, u256>
}

/// Admin can create new registries.
public fun new(_: &AdminCap, ctx: &mut TxContext): DoiRegistry {
    DoiRegistry {
        id: object::new(ctx),
        dois_to_blob_ids: table::new(ctx)
    }
}

/// DoiRegistry is transfer restricted in order to emit events.
public fun share(registry: DoiRegistry) {
    transfer::share_object(registry);
}

/// Add a new DOI to the registry.
public fun add(_: &AdminCap, registry: &mut DoiRegistry, doi: String, blob_id: u256) {
    table::add(&mut registry.dois_to_blob_ids, doi, blob_id);
}

/// Remove a DOI from the registry.
public fun remove(_: &AdminCap, registry: &mut DoiRegistry, doi: String): u256 {
    table::remove(&mut registry.dois_to_blob_ids, doi)
}

/// Delete the registry.
public fun delete(_: &AdminCap, registry: DoiRegistry) {
    let DoiRegistry { id, dois_to_blob_ids } = registry;
    dois_to_blob_ids.drop();
    id.delete();
}
