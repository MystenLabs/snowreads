import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Spinner } from "../components/common/Spinner";

// Set the workerSrc to the appropriate URL for the worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewerPage: React.FC = () => {
  const { fileUrl } = useParams<string>();
  const decodedLink = decodeURIComponent(fileUrl!); //
  const [numPages, setNumPages] = useState<number | null>(null);
  const [timeoutReached, setTimeoutReached] = useState(false); // Track if 10 seconds passed
  const navigate = useNavigate();

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]); // Array of canvas refs for each page

  useEffect(() => {
    if (!decodedLink) return; // If no URL parameter is found, exit early

    // Set a 10-second timeout to show the error message
    const timeout = setTimeout(() => {
      if (!numPages) {
        setTimeoutReached(true); // Show the timeout message after 10 seconds if PDF not loaded
      }
    }, 10000);

    const loadPDF = async () => {
      try {
        const loadingTask = pdfjs.getDocument(decodedLink);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages); // Set numPages once the PDF is loaded

        // Load all pages (for scrolling)
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);

          // Device pixel ratio for higher resolution (e.g., Retina displays)
          const dpr = window.devicePixelRatio || 1;
          const scale = window.innerWidth <= 768 ? 0.75 : 1.5; // Adjust scale based on screen size

          // Calculate the effective rotation (add the page's rotation to your custom rotation, if any)
          const rotation = (page.rotate || 0) % 360; // Handle any internal page rotation metadata

          // Get the viewport and respect any rotation metadata from the PDF
          const viewport = page.getViewport({ scale, rotation });

          const canvas = canvasRefs.current[pageNum - 1];
          const context = canvas?.getContext("2d");

          if (canvas && context) {
            // Scale canvas size for higher resolution
            const outputScale = dpr;
            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);

            // Ensure the canvas has a white background
            context.save();
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.restore();

            // Scale the context for the device pixel ratio
            context.scale(outputScale, outputScale);

            const renderContext = {
              canvasContext: context,
              viewport,
            };

            await page.render(renderContext).promise;
          }
        }
      } catch (error) {
        console.error("Error loading PDF:", error);

      }
    };

    loadPDF();
    return () => {
      clearTimeout(timeout); // Clear timeout if PDF loads or component unmounts
    };
  }, [decodedLink, numPages]);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center p-2">
        <div className="flex justify-between w-full max-w-screen-sm ">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#8B28D2] px-4 py-2 text-sm rounded-lg text-white hover:border-[#8B28D2] hover:bg-primary border-2 border-solid hover:text-[#8B28D2]"
          >
            Back
          </button>

          <a
            href={decodedLink}
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
