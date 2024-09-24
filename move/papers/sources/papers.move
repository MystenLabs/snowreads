/// Module: papers
module papers::papers;

use sui::package;

/// OTW to claim Publisher
public struct PAPERS() has drop;

/// init to claim Publisher
fun init(otw: PAPERS, ctx: &mut TxContext) {
    package::claim_and_keep(otw, ctx);
}


