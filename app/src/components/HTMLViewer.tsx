import { useEffect, useState, useRef } from 'react';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { isHtmlBlob } from '../utils/helper.ts'; // Assuming helper functions are in utils/helper

// TypeScript interfaces to define the structure
interface StorageResource {
  type: string;
  fields: {
    end_epoch: string;
    id: {
      id: string;
    };
    start_epoch: string;
    storage_size: string;
  };
}

interface BlobFields {
  blob_id: string;
  certified_epoch: string;
  erasure_code_type: number;
  id: {
    id: string;
  };
  size: string;
  storage: StorageResource;
  stored_epoch: string;
}

interface Content {
  fields: BlobFields;
}

interface Data {
  content: Content;
}

interface ObjType {
  data: Data;
}

function HTMLViewer() {
    const obj = {} as ObjType;
    console.log(obj)
    const [error, setError] = useState<string | null>(null);  // State for tracking errors
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const client = new SuiClient({ url: getFullnodeUrl('testnet') });
    const myAddress = '0xd4eb9db7884653092573e35836e0a325d6ab81dabfaf0d54f95283e4c4c126c2'; // Replace with the user's address

    // Fetch HTML from Walrus
    const fetchHTMLFromWalrus = async () => {
        //const serializedBlobId = serializeBlobId(blobId);
        const aggregatorUrl = "https://aggregator-devnet.walrus.space";
        
        // Start fetching HTML
        const startTime = performance.now();
        try {
            const response = await fetch(`${aggregatorUrl}/v1/${"7vcyKHT_QTb3V6FGu9Kk0oU6kCL8Dj-GYn7FPESyZu4"}`, { method: "GET" });
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
                    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
                    iframeDoc?.open();
                    iframeDoc?.write(htmlContent as string);  // Write the HTML content to the iframe
                    iframeDoc?.close();
                }
            };
            reader.readAsText(blob);  // Read the blob content as text

            setError(null);  // Clear any previous error

            const endTime = performance.now();
            console.log(`HTML fetched in ${(endTime - startTime).toFixed(2)}ms`);
            console.log(`HTML Size: ${(blob.size / 1024).toFixed(2)} KB`);
        } catch (error: any) {
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
            res.data.forEach((obj: any) => {
                if (obj.data?.content?.dataType === "moveObject" && obj.data.content.type.endsWith("::blob::Blob")) {
                    const fields = obj.data.content.fields as BlobFields;
                    if (isFirst && fields.blob_id) {
                        fetchHTMLFromWalrus();  // Access blob_id safely
                        isFirst = false;  // Set the flag to false after the first blob
                    }
                    console.log(`Sui Object ID: ${obj.data.objectId}`);
                    console.log(`Blob ID: ${fields.blob_id}`);
                    // console.log(`Fields: ${JSON.stringify(fields, null, 2)}`);
                }
            });

        } catch (error: any) {
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
