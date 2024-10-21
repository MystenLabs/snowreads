import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import Footer from "../layout/Footer";
import { Spinner } from "../components/common/Spinner";

// Set the workerSrc to the installed pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PDFViewerPage: React.FC = () => {
  const { blobId } = useParams<string>();
  const blobIdDecoded = decodeURIComponent(blobId!); //
  const [numPages, setNumPages] = useState<number | null>(null);
  const [timeoutReached, setTimeoutReached] = useState(false); // Track if 10 seconds passed
  const [isLoading, setIsLoading] = useState(false); // Resolve "Use different canvas or ensure previous operations were cancelled or completed."

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]); // Array of canvas refs for each page

  useEffect(() => {
    if (!blobIdDecoded) return; // If no URL parameter is found, exit early

    // Set a 10-second timeout to show the error message
    const timeout = setTimeout(() => {
      if (!numPages) {
        setTimeoutReached(true); // Show the timeout message after 10 seconds if PDF not loaded
      }
    }, 10000);

    const loadPDF = async () => {
      try {
        const loadingTask = pdfjs.getDocument(
          `https://aggregator.walrus-testnet.walrus.space/v1/${blobIdDecoded}`
        );
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages); // Set numPages once the PDF is loaded

        // Load all pages (for scrolling)
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);

          // Device pixel ratio for higher resolution (e.g., Retina displays)
          const dpr = window.devicePixelRatio || 1;
          const scale = window.innerWidth <= 768 ? 0.75 : 1.5; // Adjust scale based on screen size

          // Calculate the effective rotation (add the page's rotation to 0 and handle modulo 360)
          const rotation = (page.rotate + 0) % 360; // Combine page rotation with any additional rotation

          // Get the viewport and respect any rotation metadata from the PDF
          const viewport = page.getViewport({ scale, rotation });

          const canvas = canvasRefs.current[pageNum - 1];
          const context = canvas?.getContext("2d");

          if (canvas && context) {
            // Clear the canvas before rendering
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Reset any transformations applied to the context
            context.setTransform(1, 0, 0, 1, 0, 0);

            // Scale canvas size for higher resolution
            const outputScale = dpr;
            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);

            // Ensure the canvas has a white background
            context.save();
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.restore();

            // Apply the scaling and rotation
            context.scale(outputScale, outputScale);

            // Translate the canvas based on the rotation
            switch (rotation) {
              case 90:
                context.rotate((90 * Math.PI) / 180);
                context.translate(0, -canvas.height / outputScale);
                break;
              case 180:
                context.rotate((180 * Math.PI) / 180);
                context.translate(
                  -canvas.width / outputScale,
                  -canvas.height / outputScale
                );
                break;
              case 270:
                context.rotate((270 * Math.PI) / 180);
                context.translate(-canvas.width / outputScale, 0);
                break;
              default:
                // No rotation needed for 0 degrees
                break;
            }

            const renderContext = {
              canvasContext: context,
              viewport,
            };

            // Render the page and wait for it to complete
            await page.render(renderContext).promise;

            // Reset transformation after rendering the page
            context.setTransform(1, 0, 0, 1, 0, 0);
          }
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    if (!isLoading) {
      setIsLoading(true);
      loadPDF();
    }
    return () => {
      clearTimeout(timeout); // Clear timeout if PDF loads or component unmounts
    };
  }, [blobIdDecoded, numPages, isLoading]);

  return (
    <div>
      <header className="w-full bg-primary border-b border-gray-300">
        <div className="flex items-center justify-between p-4">
          <div className="logo">
            <Link to="/">
              <img src="/logo.png" alt="SnowReads Logo" className="h-6" />
            </Link>
          </div>
          <a
            href={`https://aggregator.walrus-testnet.walrus.space/v1/${blobIdDecoded}`}
            download
            className={`text-sm border-2 border-solid p-[8px] rounded-lg ${
              !numPages
                ? "bg-gray-400 text-gray-600 cursor-not-allowed border-gray-400"
                : "text-[#8B28D2] border-[#8B28D2] hover:bg-[#8B28D2] hover:text-white"
            }`}
            style={{ pointerEvents: !numPages ? "none" : "auto" }} // Disable link click
          >
            Download from Walrus
          </a>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center p-2">
        {/* Show spinner while PDF is loading, but removing after 10 seconds */}
        {!numPages && !timeoutReached ? (
          <Spinner />
        ) : timeoutReached ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative bg-white p-10 rounded-lg shadow-md text-center mb-[50%]">
              <img
                src="/walrus_avatar.png"
                alt="Walrus"
                className="absolute w-40 -top-20 left-1/2 transform -translate-x-1/2 z-0"
              />
              <div className="relative z-10">
                <h1 className="text-4xl font-bold text-purple-600 mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-2">PDF Not Found</h2>
                <p className="text-gray-600 mb-6">
                  Oops! Looks like this PDF resource does not exist on Walrus..
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full flex flex-col items-center overflow-auto">
            {Array.from({ length: numPages || 0 }, (_, index) => (
              <canvas
                key={index}
                ref={(el) => (canvasRefs.current[index] = el)}
                className="border my-2 w-full max-w-screen-sm"
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PDFViewerPage;
