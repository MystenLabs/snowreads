import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { bcs } from "@mysten/sui/bcs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
  console.error("Error: .env file not found!");
  console.log("Please create a .env file based on .env.example");
  process.exit(1);
}

dotenv.config({ path: envPath });

// Type for Sui network
type SuiNetwork = "mainnet" | "testnet" | "devnet" | "localnet";

// Validate required environment variables
const requiredEnvVars = [
  "SUI_NETWORK",
  "WALRUS_PACKAGE_ID",
  "UPLOADER_ADDRESS",
] as const;
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} is not set in .env file`);
    process.exit(1);
  }
}

// Validate network type
const network = process.env.SUI_NETWORK?.toLowerCase();
if (!["mainnet", "testnet", "devnet", "localnet"].includes(network!)) {
  console.error(
    "Error: SUI_NETWORK must be one of: mainnet, testnet, devnet, localnet"
  );
  process.exit(1);
}

// Configuration constants
const CONFIG = {
  SUI_NETWORK: network as SuiNetwork,
  WALRUS_PACKAGE_ID: process.env.WALRUS_PACKAGE_ID as string,
  UPLOADER_ADDRESS: process.env.UPLOADER_ADDRESS as string,
  PATHS: {
    ABS_DIR: path.join(__dirname, "..", "data", "abs"),
    METADATA_INDEX: path.join(__dirname, "..", "app", "public", "index.json"),
    OUTPUT_FILE: path.join(__dirname, "..", "data", "blob-object-ids.json"),
    OUTPUT_MISSING_FILE: path.join(
      __dirname,
      "..",
      "data",
      "missing-blob-ids.json"
    ),
  },
} as const;

// Initialize SuiClient with the network configuration
const client = new SuiClient({ url: getFullnodeUrl(CONFIG.SUI_NETWORK) });

// Type definitions
interface AbsData {
  blobId: string;
  [key: string]: any;
}

interface MetadataIndex {
  [paperId: string]: string; // paperId -> blobId mapping
}

interface BlobCollection {
  blobIds: Set<string>;
  source: string;
}

function u256ToUint8Array(u256: string | bigint): Uint8Array {
  const value = typeof u256 === "bigint" ? u256 : BigInt(u256);
  const bytes = new Uint8Array(32); // u256 is always 32 bytes
  let temp = value;
  for (let i = 0; i < 32; i++) {
    bytes[i] = Number(temp & 0xffn);
    temp >>= 8n;
  }
  return bytes;
}

// Helper: Uint8Array → base64url
function toBase64Url(bytes: Uint8Array): string {
  const binaryString = Array.from(bytes, (byte) =>
    String.fromCharCode(byte)
  ).join("");

  const binaryStringB64 = btoa(binaryString);
  // Use the URL-safe Base 64 encoding by removing padding and swapping characters.
  return (
    binaryStringB64
      // @ts-expect-error
      .replaceAll("/", "_")
      .replaceAll("+", "-")
      .replaceAll("=", "")
  );
}

// PDF blob collection
async function collectPdfBlobIds(): Promise<BlobCollection> {
  const blobIds = new Set<string>();

  const absFiles = fs
    .readdirSync(CONFIG.PATHS.ABS_DIR)
    .filter((file) => file.endsWith(".json"));

  for (const file of absFiles) {
    const absData = JSON.parse(
      fs.readFileSync(path.join(CONFIG.PATHS.ABS_DIR, file), "utf-8")
    ) as AbsData;

    if (absData.blobId) {
      blobIds.add(absData.blobId);
    }
  }

  return {
    blobIds,
    source: "PDF files",
  };
}

// Metadata blob collection
async function collectMetadataBlobIds(): Promise<BlobCollection> {
  const blobIds = new Set<string>();

  const indexData = JSON.parse(
    fs.readFileSync(CONFIG.PATHS.METADATA_INDEX, "utf-8")
  ) as MetadataIndex;

  // In index.json, the format is "paper_id": "blobId"
  Object.values(indexData).forEach((blobId) => {
    if (typeof blobId === "string") {
      blobIds.add(blobId);
    }
  });

  return {
    blobIds,
    source: "Metadata files",
  };
}

// Combine all blob IDs
async function collectAllBlobIds(): Promise<Set<string>> {
  const collections = await Promise.all([
    collectPdfBlobIds(),
    collectMetadataBlobIds(),
  ]);

  const allBlobIds = new Set<string>();

  for (const collection of collections) {
    console.log(
      `Found ${collection.blobIds.size} blob IDs from ${collection.source}`
    );
    collection.blobIds.forEach((id) => allBlobIds.add(id));
  }

  console.log(`Total unique blob IDs: ${allBlobIds.size}`);

  return allBlobIds;
}

// Query and process Sui blockchain objects
async function queryChainObjects(
  knownBlobIds: Set<string>
): Promise<Map<string, string>> {
  let cursor: string | null = null;
  const foundBlobIds = new Set<string>();
  const objectIds = new Map<string, string>(); // Map of blob_id to object_id

  do {
    const ownedObjects = await client.getOwnedObjects({
      owner: CONFIG.UPLOADER_ADDRESS,
      filter: {
        StructType: `${CONFIG.WALRUS_PACKAGE_ID}::blob::Blob`,
      },
      options: {
        showContent: true,
      },
      cursor,
    });

    for (const obj of ownedObjects.data) {
      if (!obj.data?.content) continue;

      const fields = (obj.data.content as any).fields;

      const blobId_u256 = fields.blob_id;
      const blobId_Uint8Array = bcs.u256().serialize(blobId_u256).toBytes();

      const blobId = toBase64Url(blobId_Uint8Array);

      if (knownBlobIds.has(blobId)) {
        foundBlobIds.add(blobId);
        objectIds.set(blobId, obj.data.objectId);
      }
    }

    cursor = ownedObjects.hasNextPage ? ownedObjects.nextCursor : null;
  } while (cursor !== null);

  // Report results
  console.log("\nChain Query Results:");
  console.log("-----------------");
  console.log(`Total known blob IDs: ${knownBlobIds.size}`);
  console.log(`Found matching objects: ${foundBlobIds.size}`);

  // Report missing blob IDs
  const missingBlobIds = Array.from(knownBlobIds).filter(
    (id: string) => !foundBlobIds.has(id)
  );

  if (missingBlobIds.length > 0) {
    console.log(
      `\nWarning: ${missingBlobIds.length} blob IDs were not found on chain. Saving them on file: ${CONFIG.PATHS.OUTPUT_MISSING_FILE}`
    );
    // Save missing blob IDs to file
    fs.writeFileSync(
      CONFIG.PATHS.OUTPUT_MISSING_FILE,
      JSON.stringify(missingBlobIds, null, 2)
    );
  }

  return objectIds;
}

// Save results to file
function saveObjectIdsMapping(objectIds: Map<string, string>): void {
  const objectIdsMapping = Object.fromEntries(objectIds);
  fs.writeFileSync(
    CONFIG.PATHS.OUTPUT_FILE,
    JSON.stringify(objectIdsMapping, null, 2)
  );

  console.log(
    `\nObject IDs mapping has been saved to: ${CONFIG.PATHS.OUTPUT_FILE}`
  );
  console.log(
    'You can now use these object IDs with the "walrus extend" command'
  );
}

async function main(): Promise<void> {
  try {
    const knownBlobIds = await collectAllBlobIds();
    const objectIds = await queryChainObjects(knownBlobIds);
    saveObjectIdsMapping(objectIds);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}
