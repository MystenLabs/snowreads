import React, { useEffect, useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useSuiClient } from '@mysten/dapp-kit';
import { serializeBlobId, isPdfBlob } from './utils/helper'; // Assuming helper functions are in utils/helper

function PdfViewer() {
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
    const [error, setError] = useState(null);  // State for tracking errors
    const client = useSuiClient();
    const myAddress = '0xd4eb9db7884653092573e35836e0a325d6ab81dabfaf0d54f95283e4c4c126c2'; // !IMPORTANT: Replace with the address of the user who uploaded the PDFs on walrus

    // Fetch PDF from Walrus
    const fetchPDFFromWalrus = async (blobId) => {
      const serializedBlobId = serializeBlobId(blobId);
      const aggregatorUrl = "https://aggregator-devnet.walrus.space";
      console.log(`Fetching PDF with blob ID: ${serializedBlobId}`);
      
      // Test fetch time from walrus
      const startTime = performance.now();
      try {
          const response = await fetch(`${aggregatorUrl}/v1/${serializedBlobId}`, { method: "GET" });
          if (!response.ok) throw new Error("Error fetching the PDF");

          const blob = await response.blob();

          // Check if the blob is a PDF by checking its signature TODO: Ask if this condition is enough
          const isPdf = await isPdfBlob(blob);
          if (!isPdf) {
              setError("The fetched blob is not a PDF.");  // Set error state
              return; // Return early if it's not a PDF
          }

          setPdfBlobUrl(URL.createObjectURL(blob));
          setError(null);  // Clear any previous error

          const endTime = performance.now();
          console.log(`PDF fetched in ${(endTime - startTime).toFixed(2)}ms`);
          console.log(`PDF Size: ${(blob.size / 1024).toFixed(2)} KB`);
      } catch (error) {
          setError("Failed to fetch PDF: " + error.message);  // Set error state
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
            
            let isFirst = true; // Flag to fetch only the first PDF just for testing purposes. Later all pdfs will be fetched and viewed accordingly
            res.data.forEach((obj) => {
                if (obj.data.content.dataType === "moveObject" && obj.data.content.type.endsWith("::blob::Blob")) {
                    if (isFirst) {
                      fetchPDFFromWalrus(obj.data.content.fields.blob_id);
                      isFirst = false; // Set the flag to false after the first obj
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
                <h1>PDF Viewer from Walrus</h1>
                {error ? (
                    <p style={{ color: 'red' }}>{error}</p>  // Display error message
                ) : pdfBlobUrl ? (
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfBlobUrl} />
                    </Worker>
                ) : (<p>Loading PDF...</p>)}
            </header>
        </div>
    );
}
export default PdfViewer;
