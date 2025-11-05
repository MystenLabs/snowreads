import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { deriveDynamicFieldID } from "@mysten/sui/utils";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { bcs } from "@mysten/sui/bcs";

// --- Helper functions from walrus_extend.ts ---
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const BYTES_PER_UNIT_SIZE = 1_024n * 1_024n; // 1 MiB

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

dotenv.config({ path: path.join(__dirname, ".env.mainnet") });

const SUI_NETWORK =
  (process.env.SUI_NETWORK as "mainnet" | "testnet") || "mainnet";
const WAL_PACKAGE_ID = process.env.WAL_PACKAGE_ID!;
const PHRASE = process.env.PHRASE;
const SYSTEM_OBJECT_ID = process.env.SYSTEM_OBJECT_ID;
const EPOCHS_TO_EXTEND = 12;
const BATCH_SIZE = 50; // PTB transaction limit is 1024 commands. 50 blobs is safe.
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3_000; // 3 seconds
const BATCH_DELAY_MS = 1_000; // 1 second between successful batches

// const PATHS = {
// INPUT_FILE: path.join(__dirname, "..", "data", "blob-object-ids.json"),
// };

const PATHS = {
  INPUT_FILE: path.join(__dirname, "..", "data", "blob-object-ids.json"),
  SUCCESS_LOG: path.join(__dirname, "extend_success.log"),
  FAILURE_LOG: path.join(__dirname, "extend_failure.log"),
};

// --- Type Definitions ---
interface WalrusSystemInfo {
  storagePricePerUnit: bigint;
  packageId: string;
}

interface SystemStateInnerV1 {
  write_price_per_unit_size: string;
  // ... other fields we don't need
}

// --- Validation ---
if (!PHRASE) {
  console.error("Error: PHRASE must be set in .env");
  process.exit(1);
}

/**
 * Fetches critical info from the Walrus System object.
 */
async function getWalrusSystemInfo(
  client: SuiClient
): Promise<WalrusSystemInfo> {
  console.log("Fetching Walrus system state...");

  // 1. Fetch the Walrus System object to get its current, live version and package ID.
  const systemObject = await client.getObject({
    id: SYSTEM_OBJECT_ID!,
    options: { showContent: true },
  });
  const fields = (systemObject.data?.content as any)?.fields;
  const systemVersion = fields?.version;
  const packageId = fields?.package_id;

  if (!systemVersion || !packageId) {
    throw new Error(
      `Could not determine version or packageId for System Object: ${SYSTEM_OBJECT_ID}`
    );
  }
  console.log(`Found on-chain Walrus System version: ${systemVersion}`);
  console.log(`Found on-chain Walrus Package ID: ${packageId}`);

  // 2. Derive the dynamic field ID using the LIVE version.
  const innerStateObjectId = await deriveDynamicFieldID(
    SYSTEM_OBJECT_ID!,
    "u64",
    bcs.U64.serialize(systemVersion).toBytes()
  );

  // 3. Get the dynamic field object directly using its derived ID.
  const innerState = await client.getObject({
    id: innerStateObjectId,
    options: { showContent: true },
  });

  const innerStateFields = (innerState.data?.content as any)?.fields?.value
    ?.fields as SystemStateInnerV1;
  const price = BigInt(innerStateFields.write_price_per_unit_size);
  console.log(`Storage price per unit size: ${price}`);

  return { storagePricePerUnit: price, packageId };
}

// --- Core Logic ---

async function main() {
  const client = new SuiClient({ url: getFullnodeUrl(SUI_NETWORK) });
  const keypair = Ed25519Keypair.deriveKeypair(PHRASE);
  const sender = keypair.getPublicKey().toSuiAddress();
  console.log(`Extending blobs for sender: ${sender} on ${SUI_NETWORK}`);

  // --- NEW: Resumability Logic ---
  const processedIds = new Set<string>();
  if (fs.existsSync(PATHS.SUCCESS_LOG)) {
    const logContent = fs.readFileSync(PATHS.SUCCESS_LOG, "utf-8");
    logContent.split("\n").forEach((id) => {
      if (id) processedIds.add(id.trim());
    });
  }
  console.log(`Found ${processedIds.size} already processed blobs to skip.`);

  const objectIdMap: Record<string, string> = JSON.parse(
    fs.readFileSync(PATHS.INPUT_FILE, "utf-8")
  );
  const allBlobIds = Object.values(objectIdMap);
  const idsToProcess = allBlobIds.filter((id) => !processedIds.has(id));
  console.log(
    `Found ${allBlobIds.length} total blobs. Processing ${idsToProcess.length} remaining blobs.`
  );
  if (idsToProcess.length === 0) {
    console.log("All blobs have been processes successfully");
    return;
  }

  const { storagePricePerUnit, packageId } = await getWalrusSystemInfo(client);

  for (let i = 0; i < idsToProcess.length; i += BATCH_SIZE) {
    const batchIds = idsToProcess.slice(i, i + BATCH_SIZE);
    const batchNumber = i / BATCH_SIZE + 1;
    const totalBatches = Math.ceil(idsToProcess.length / BATCH_SIZE);
    console.log(
      `\n--- Processing Batch ${batchNumber}/${totalBatches} (${batchIds.length} blobs) ---`
    );

    let success = false;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const tx = new Transaction();
        const blobs = await client.multiGetObjects({
          ids: batchIds,
          options: { showContent: true },
        });

        const costs = [];
        const validBlobs = blobs.filter((b) => !b.error && b.data?.content);

        for (const blob of validBlobs) {
          const fields = (blob.data!.content as any).fields;
          const storageSize = BigInt(fields.storage.fields.storage_size);
          const cost = priceForEncodedLength(
            storageSize,
            storagePricePerUnit,
            BigInt(EPOCHS_TO_EXTEND)
          );
          costs.push(cost);
        }
        const totalCost = costs.reduce((sum, cost) => sum + cost, 0n);
        console.log(
          `Calculated total cost for batch: ${totalCost} FROST for ${validBlobs.length} blobs.`
        );

        const walCoins = await client.getCoins({
          owner: sender,
          coinType: `${WAL_PACKAGE_ID}::wal::WAL`,
        });

        const totalWalBalance = walCoins.data.reduce(
          (acc, coin) => acc + BigInt(coin.balance),
          0n
        );

        if (totalWalBalance < totalCost) {
          throw new Error(
            `Insufficient WAL balance. Required: ${totalCost}, Available: ${totalWalBalance}`
          );
        }

        const sourceCoin = walCoins.data.find(
          (coin) => BigInt(coin.balance) >= totalCost
        );

        if (!sourceCoin) {
          throw new Error(
            `Could not find a single WAL coin with balance >= ${totalCost} FROST. Please consolidate your WAL coins.`
          );
        }

        const sourceCoinObject = tx.object(sourceCoin.coinObjectId);

        validBlobs.forEach((blob) => {
          tx.moveCall({
            target: `${packageId}::system::extend_blob`,
            arguments: [
              tx.object(SYSTEM_OBJECT_ID!),
              tx.object(blob.data!.objectId),
              tx.pure.u32(EPOCHS_TO_EXTEND),
              sourceCoinObject,
            ],
          });
        });

        const result = await client.signAndExecuteTransaction({
          signer: keypair,
          transaction: tx,
          options: { showEffects: true },
        });

        if (result.effects?.status.status === "success") {
          console.log(
            `✅ Batch ${batchNumber} extended successfully! Digest: ${result.digest}`
          );
          // NEW: Log successful IDs
          fs.appendFileSync(PATHS.SUCCESS_LOG, batchIds.join("\n") + "\n");
          success = true;
          break; // Exit retry loop on success
        } else {
          throw new Error(
            `Batch ${batchNumber} failed on-chain: ${result.effects?.status.error}`
          );
        }
      } catch (error) {
        console.error(
          `❌ Attempt ${attempt}/${MAX_RETRIES} failed for batch ${batchNumber}:`,
          (error as Error).message
        );
        if (attempt === MAX_RETRIES) {
          console.error(
            `Giving up on batch ${batchNumber} after ${MAX_RETRIES} attempts.`
          );
          // NEW: Log failed IDs
          fs.appendFileSync(PATHS.FAILURE_LOG, batchIds.join("\n") + "\n");
        } else {
          console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
          await sleep(RETRY_DELAY_MS);
        }
      }
    }
    // NEW: Pause between batches to be polite
    if (success) {
      await sleep(BATCH_DELAY_MS);
    }
  }
}

main().catch((err) => {
  console.error("An unexpected error occurred:", err);
  process.exit(1);
});
