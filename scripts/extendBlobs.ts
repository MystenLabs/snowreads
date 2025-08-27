import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { deriveDynamicFieldID } from "@mysten/sui/utils";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { bcs } from "@mysten/sui/bcs";

// --- Helper functions from walrus_extend.ts ---

const BYTES_PER_UNIT_SIZE = 1_024n * 1_024n; // 1 MiB
const SYSTEM_OBJECT_ID =
  "0x2134d52768ea07e8c43570ef975eb3e4c27a39fa6396bef985b5abc58d03ddd2";
const WALRUS_SYSTEM_VERSION = 3;

// const WALRUS_PACKAGE_ID =
//   "0xfdc88f7d7cf30afab2f82e8380d11ee8f70efb90e863d1de8616fae1bb09ea77";

function storageUnitsFromSize(encodedSize: bigint): bigint {
  return (encodedSize + BYTES_PER_UNIT_SIZE - 1n) / BYTES_PER_UNIT_SIZE;
}

function priceForEncodedLength(
  encodedLength: bigint,
  pricePerUnitSize: bigint,
  epochs: bigint
): bigint {
  return storageUnitsFromSize(encodedLength) * pricePerUnitSize * epochs;
}

// --- Configuration ---

dotenv.config({ path: path.join(__dirname, ".env") });

const SUI_NETWORK =
  (process.env.SUI_NETWORK as "mainnet" | "testnet") || "mainnet";
const WALRUS_PACKAGE_ID = process.env.WALRUS_PACKAGE_ID!;
const SENDER_SECRET_KEY = process.env.SENDER_SECRET_KEY;
const EPOCHS_TO_EXTEND = 30;
const BATCH_SIZE = 50; // PTB transaction limit is 1024 commands. 50 blobs is safe.

const PATHS = {
  INPUT_FILE: path.join(__dirname, "..", "data", "blob-object-ids.json"),
};

// --- Type Definitions ---
interface WalrusSystemState {
  id: { id: string };
  version: string;
}

interface SystemStateInnerV1 {
  write_price_per_unit_size: string;
  // ... other fields we don't need
}

// --- Validation ---
if (!SENDER_SECRET_KEY || !WALRUS_PACKAGE_ID) {
  console.error(
    "Error: SENDER_SECRET_KEY and WALRUS_PACKAGE_ID must be set in .env"
  );
  process.exit(1);
}

// --- Core Logic ---

/**
 * Fetches the storage price from the Walrus System object's dynamic field.
 */
async function getStoragePricePerUnit(client: SuiClient): Promise<bigint> {
  console.log("Fetching Walrus system state...");

  // 1. Derive the dynamic field ID for the SystemStateInnerV1 object off-chain.
  // The key is the version number, serialized as a u64.
  const innerStateObjectId = await deriveDynamicFieldID(
    SYSTEM_OBJECT_ID,
    "u64",
    bcs.U64.serialize(WALRUS_SYSTEM_VERSION).toBytes()
  );

  console.log(`Derived Inner State Object ID: ${innerStateObjectId}`);

  // 2. Get the dynamic field object directly using its derived ID.
  const innerState = await client.getObject({
    id: innerStateObjectId,
    options: { showContent: true },
  });

  const innerStateFields = (innerState.data?.content as any)?.fields?.value
    ?.fields as SystemStateInnerV1;
  const price = BigInt(innerStateFields.write_price_per_unit_size);
  console.log(`Storage price per unit size: ${price}`);
  return price;
}

async function main() {
  const client = new SuiClient({ url: getFullnodeUrl(SUI_NETWORK) });
  const keypair = Ed25519Keypair.fromSecretKey(
    Buffer.from(SENDER_SECRET_KEY, "base64")
  );
  const sender = keypair.getPublicKey().toSuiAddress();
  console.log(`Extending blobs for sender: ${sender} on ${SUI_NETWORK}`);

  const objectIdMap: Record<string, string> = JSON.parse(
    fs.readFileSync(PATHS.INPUT_FILE, "utf-8")
  );
  const allBlobIds = Object.values(objectIdMap);
  console.log(`Found ${allBlobIds.length} total blobs to extend.`);

  const storagePricePerUnit = await getStoragePricePerUnit(client);

  for (let i = 0; i < allBlobIds.length; i += BATCH_SIZE) {
    const batchIds = allBlobIds.slice(i, i + BATCH_SIZE);
    const batchNumber = i / BATCH_SIZE + 1;
    console.log(
      `\n--- Processing Batch ${batchNumber} (${batchIds.length} blobs) ---`
    );

    try {
      const tx = new Transaction();
      const blobs = await client.multiGetObjects({
        ids: batchIds,
        options: { showContent: true },
      });

      // 1. Calculate total cost for the batch
      let totalCost = 0n;
      for (const blob of blobs) {
        if (blob.error || !blob.data?.content) continue;
        const fields = (blob.data.content as any).fields;
        const storageSize = BigInt(fields.storage.fields.storage_size);
        totalCost += priceForEncodedLength(
          storageSize,
          storagePricePerUnit,
          BigInt(EPOCHS_TO_EXTEND)
        );
      }
      console.log(`Calculated cost for batch: ${totalCost} WAL`);

      // 2. Fill WAL balance (equivalent to `fill_wal_balance`)
      const walCoins = await client.getCoins({
        owner: sender,
        coinType: `${WALRUS_PACKAGE_ID}::wal::WAL`,
      });
      const [primaryCoin, ...mergeCoins] = walCoins.data.map((c) =>
        tx.object(c.coinObjectId)
      );

      if (!primaryCoin) throw new Error("No WAL coins found for payment.");

      if (mergeCoins.length > 0) {
        tx.mergeCoins(primaryCoin, mergeCoins);
      }
      const [paymentCoin] = tx.splitCoins(primaryCoin, [totalCost]);

      // 3. Add a `moveCall` for each blob in the batch
      for (const blobId of batchIds) {
        tx.moveCall({
          target: `${WALRUS_PACKAGE_ID}::system::extend_blob`,
          arguments: [
            tx.object("0x9"), // Walrus System object is owned by 0x9
            tx.object(blobId),
            tx.pure.u32(EPOCHS_TO_EXTEND),
            paymentCoin,
          ],
        });
      }

      // 4. Sign and execute the transaction
      const result = await client.signAndExecuteTransaction({
        signer: keypair,
        transaction: tx,
        options: { showEffects: true },
      });

      if (result.effects?.status.status === "success") {
        console.log(
          `✅ Batch ${batchNumber} extended successfully! Digest: ${result.digest}`
        );
      } else {
        console.error(
          `❌ Batch ${batchNumber} failed: ${result.effects?.status.error}`
        );
      }
    } catch (error) {
      console.error(`❌ Failed to process batch ${batchNumber}:`, error);
    }
  }
}

main().catch((err) => {
  console.error("An unexpected error occurred:", err);
  process.exit(1);
});
