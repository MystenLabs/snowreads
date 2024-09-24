/// Auth module
/// AdminCap is used in sibling modules to perform admin operations.
module papers::auth;

use sui::event;
use sui::package::Publisher;

/// AdminCap is a capability that allows the holder to perform admin operations.
public struct AdminCap has key {
    id: UID
}

public struct AdminCapTransferred has copy, drop {
    cap_id: ID,
    from: address,
    to: address
}

/// Publisher of the contract can create a new AdminCap.
public fun new(pub: &Publisher, ctx: &mut TxContext): AdminCap {
    assert!(pub.from_package<AdminCap>());
    AdminCap {
        id: object::new(ctx)
    }
}

public fun transfer(cap: AdminCap, to: address, ctx: &TxContext) {
    event::emit(AdminCapTransferred {
        cap_id: object::id(&cap),
        from: ctx.sender(),
        to: to
    });
    transfer::transfer(cap, to);
}

/// Holder of AdminCap can delete it.
public fun delete(cap: AdminCap) {
    let AdminCap { id } = cap;
    id.delete();
}

