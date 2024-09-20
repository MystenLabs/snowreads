import { bcs } from '@mysten/bcs';
// Utility functions
export const base64UrlSafeEncode = (data) => {
    let base64 = arrayBufferToBase64(data);
    return base64.replaceAll("/", "_").replaceAll("+", "-").replaceAll("=", "");
};

export const arrayBufferToBase64 = (bytes) => {
    const binaryString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
    return btoa(binaryString);
};

export const serializeBlobId = (id) => {
    const serialized = bcs.u256().serialize(id).toBytes();
    return base64UrlSafeEncode(serialized);
};

// Helper function to check if the blob is a PDF
export const isPdfBlob = async (blob) => {
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer.slice(0, 4)); // Check the first 4 bytes
    
    // Check if the first bytes are the PDF signature
    const pdfSignature = [0x25, 0x50, 0x44, 0x46]; // Corresponds to "%PDF"
    return bytes.every((byte, i) => byte === pdfSignature[i]);
    };