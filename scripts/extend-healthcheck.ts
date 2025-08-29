import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// --- Configuration ---
dotenv.config({ path: path.join(__dirname, ".env.mainnet") });

const SUI_NETWORK =
  (process.env.SUI_NETWORK as "mainnet" | "testnet") || "mainnet";
const BATCH_SIZE = 50; // A safe batch size for multiGetObjects
const TARGET_EPOCH = 25;

const PATHS = {
  INPUT_FILE: path.join(__dirname, "..", "data", "blob-object-ids.json"),
  FAILURE_LOG: path.join(__dirname, "failed_to_extend_blobs.txt"),
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Core Logic ---
async function main() {
  console.log(
    `Starting health check on ${SUI_NETWORK} for epoch >= ${TARGET_EPOCH}...`
  );

  const client = new SuiClient({ url: getFullnodeUrl(SUI_NETWORK) });

  if (!fs.existsSync(PATHS.INPUT_FILE)) {
    console.error(`Error: Input file not found at ${PATHS.INPUT_FILE}`);
    process.exit(1);
  }

  const allBlobIds: string[] = Object.values(
    JSON.parse(fs.readFileSync(PATHS.INPUT_FILE, "utf-8"))
  );
  console.log(`Found ${allBlobIds.length} total blobs to check.`);

  // Reset the failure log for a clean run
  if (fs.existsSync(PATHS.FAILURE_LOG)) {
    fs.unlinkSync(PATHS.FAILURE_LOG);
  }

  let failedCount = 0;
  const totalBatches = Math.ceil(allBlobIds.length / BATCH_SIZE);

  for (let i = 0; i < allBlobIds.length; i += BATCH_SIZE) {
    const batchIds = allBlobIds.slice(i, i + BATCH_SIZE);
    const batchNumber = i / BATCH_SIZE + 1;
    console.log(`--- Processing Batch ${batchNumber}/${totalBatches}...`);

    try {
      const blobs = await client.multiGetObjects({
        ids: batchIds,
        options: { showContent: true },
      });

      const failedIdsInBatch: string[] = [];

      for (const blob of blobs) {
        if (blob.error || !blob.data) {
          continue; // We'll identify these fetch failures in the next step
        }

        const endEpoch = (blob.data.content as any)?.fields?.storage?.fields
          ?.end_epoch;

        // Check for missing epoch or an epoch that is too low
        if (endEpoch == null || parseInt(endEpoch, 10) < TARGET_EPOCH) {
          failedIdsInBatch.push(blob.data.objectId);
        }
      }

      // Find any IDs that were in the input batch but not in the successful responses
      const successfulIds = new Set(
        blobs.filter((b) => b.data).map((b) => b.data!.objectId)
      );
      const fetchFailedIds = batchIds.filter((id) => !successfulIds.has(id));

      const allFailedIds = [
        ...new Set([...failedIdsInBatch, ...fetchFailedIds]),
      ];

      if (allFailedIds.length > 0) {
        failedCount += allFailedIds.length;
        fs.appendFileSync(PATHS.FAILURE_LOG, allFailedIds.join("\n") + "\n");
        console.log(`Found ${allFailedIds.length} failures in batch.`);
      } else {
        console.log("✅ Batch OK.");
      }
    } catch (error) {
      // If the entire RPC call fails, log all IDs in the batch as failed
      failedCount += batchIds.length;
      fs.appendFileSync(PATHS.FAILURE_LOG, batchIds.join("\n") + "\n");
      console.error(
        `❌ Batch ${batchNumber} failed: ${
          (error as Error).message
        }. Logged all ${batchIds.length} IDs.`
      );
    }
    await sleep(200); // Be polite to the RPC endpoint
  }

  console.log("\n--- Health Check Complete ---");
  if (failedCount > 0) {
    console.log(`🔴 Found ${failedCount} total blobs that failed the check.`);
    console.log(`See details in: ${PATHS.FAILURE_LOG}`);
  } else {
    console.log("🟢 All blobs passed the health check successfully!");
  }
}

main().catch((err) => {
  console.error("An unexpected error occurred:", err);
  process.exit(1);
});
