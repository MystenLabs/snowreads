import { bcs } from '@mysten/bcs';

// Utility functions
export const base64UrlSafeEncode = (data: ArrayBuffer): string => {
    let base64 = arrayBufferToBase64(data);
    return base64.replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
};

export const arrayBufferToBase64 = (bytes: ArrayBuffer): string => {
    const binaryString = Array.from(new Uint8Array(bytes), (byte) => String.fromCharCode(byte)).join("");
    return btoa(binaryString);
};

export const serializeBlobId = (id: bigint): string => {
    const serialized = bcs.u256().serialize(id).toBytes();
    return base64UrlSafeEncode(serialized);
};

// Helper function to check if the blob is an HTML file
export const isHtmlBlob = async (blob: Blob): Promise<boolean> => {
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer.slice(0, 15)); // Check the first 15 bytes

    // Convert bytes to a string
    const text = new TextDecoder().decode(bytes);

    // Check if it starts with common HTML signatures
    const isHtml = text.includes('<!DOCTYPE html>') || text.includes('<html');

    return isHtml;
};
