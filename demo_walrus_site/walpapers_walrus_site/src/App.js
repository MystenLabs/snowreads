import { useEffect, useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function App() {
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

    const fetchPDFFromWalrus = async () => {
    const blobId = "CobOS6PhNBCDTi95bH71kzDNxoWfjVNclHTareztmTc"; // Blob ID for the PDF
    const aggregatorUrl = "https://aggregator-devnet.walrus.space"; // Public Walrus aggregator URL

    console.log(`Fetching PDF with blob ID: ${blobId}`);

    // Start tracking time
    const startTime = performance.now();

    // Fetch the PDF from the public aggregator
    const response = await fetch(`${aggregatorUrl}/v1/${blobId}`, {
        method: "GET",
    });

    if (!response.ok) {
        console.error("Error fetching the PDF");
        return;
    }

    // Convert the response to a Blob
    const blob = await response.blob();
    const blobURL = URL.createObjectURL(blob);
    setPdfBlobUrl(blobURL);

    // Calculate file size and time taken
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    const pdfSize = blob.size / 1024; // Convert to KB

    // Log the details
    console.log(`PDF fetched in ${timeTaken.toFixed(2)}ms`);
    console.log(`Blob ID: ${blobId}`);
    console.log(`PDF Size: ${pdfSize.toFixed(2)} KB`);
};


    useEffect(() => {
        fetchPDFFromWalrus();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>PDF Viewer from Walrus</h1>
                {pdfBlobUrl ? (
                    <div >
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={pdfBlobUrl} />
                        </Worker>
                    </div>
                ) : (
                    <p>Loading PDF...</p>
                )}
            </header>
        </div>
    );
}

export default App;
