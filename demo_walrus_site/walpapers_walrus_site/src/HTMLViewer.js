import React, { useEffect, useState, useRef } from 'react';
import { useSuiClient } from '@mysten/dapp-kit';
import { serializeBlobId, isHtmlBlob } from './utils/helper'; // Assuming helper functions are in utils/helper

function HTMLViewer() {
    const [error, setError] = useState(null);  // State for tracking errors
    const iframeRef = useRef(null); // Reference for the iframe element
    const client = useSuiClient();
    const myAddress = '0xd4eb9db7884653092573e35836e0a325d6ab81dabfaf0d54f95283e4c4c126c2'; // Replace with the user's address

    // Fetch HTML from Walrus
    const fetchHTMLFromWalrus = async (blobId) => {
        const serializedBlobId = serializeBlobId(blobId);
        const aggregatorUrl = "https://aggregator-devnet.walrus.space";
        
        // Start fetching HTML
        const startTime = performance.now();
        try {
            const response = await fetch(`${aggregatorUrl}/v1/${"Tn_KOAiFjxgcQzZPMwl2AkS3lvv6fbIeBssNuA4bWJA"}`, { method: "GET" });
            if (!response.ok) throw new Error("Error fetching");

            const blob = await response.blob();

            // Check if the blob is HTML
            const isHTML = await isHtmlBlob(blob);
            if (!isHTML) {
                setError("The fetched blob is not an HTML file.");  // Set error state
                return;  // Return early if it's not an HTML file
            }

            const reader = new FileReader();
            reader.onloadend = function () {
                const htmlContent = reader.result;  // Get the HTML content from blob

                // Inject the HTML content into the iframe
                if (iframeRef.current) {
                    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
                    iframeDoc.open();
                    iframeDoc.write(htmlContent);  // Write the HTML content to the iframe
                    iframeDoc.close();
                }
            };
            reader.readAsText(blob);  // Read the blob content as text

            setError(null);  // Clear any previous error

            const endTime = performance.now();
            console.log(`HTML fetched in ${(endTime - startTime).toFixed(2)}ms`);
            console.log(`HTML Size: ${(blob.size / 1024).toFixed(2)} KB`);
        } catch (error) {
            setError("Failed to fetch HTML: " + error.message);  // Set error state
        }
    };

    // Fetch blobs owned by the address
    const fetchBlobsOwnedByAddress = async () => {
        try {
            const res = await client.getOwnedObjects({
                owner: myAddress,
                options: {
                    showContent: true,
                    showType: true,
                },
            });

            let isFirst = true; // Flag to fetch only the first HTML blob for testing purposes
            res.data.forEach((obj) => {
                if (obj.data.content.dataType === "moveObject" && obj.data.content.type.endsWith("::blob::Blob")) {
                    if (isFirst) {
                        fetchHTMLFromWalrus(obj.data.content.fields.blob_id);
                        isFirst = false;  // Set the flag to false after the first blob
                    }
                    console.log(`Sui Object ID: ${obj.data.objectId}`);
                    console.log(`Blob ID: ${obj.data.content.fields.blob_id}`);
                }
            });

        } catch (error) {
            setError("Error fetching blobs: " + error.message);  // Set error state
        }
    };

    useEffect(() => {
        fetchBlobsOwnedByAddress();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>HTML Viewer from Walrus</h1>
                {error ? (
                    <p style={{ color: 'red' }}>{error}</p>  // Display error message
                ) : (
                    // Render an iframe where the HTML content will be injected
                    <iframe 
                        ref={iframeRef} 
                        style={{ width: '100%', height: '600px', border: 'none' }} 
                        title="HTML Document Viewer" 
                    />
                )}
            </header>
        </div>
    );
}

export default HTMLViewer;
