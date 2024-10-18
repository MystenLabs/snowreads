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
  const navigate = useNavigate();

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]); // Array of canvas refs for each page
  console.log(canvasRefs);
  useEffect(() => {
    if (!decodedLink) return; // If no URL parameter is found, exit early

    const loadPDF = async () => {
      const loadingTask = pdfjs.getDocument(decodedLink);
      const pdf = await loadingTask.promise;
      setNumPages(pdf.numPages);

      // Load all pages (for scrolling)
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        // Device pixel ratio for higher resolution (e.g., Retina displays)
        const dpr = window.devicePixelRatio || 1;
        const scale = window.innerWidth <= 768 ? 0.75 : 1.5; // Adjust scale based on screen size

        // Get the viewport and apply scaling
        const viewport = page.getViewport({ scale });

        const canvas = canvasRefs.current[pageNum - 1];
        const context = canvas?.getContext("2d");

        if (canvas && context) {
          // Scale canvas size for higher resolution
          const outputScale = dpr;
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);

          // Scale the context for the device pixel ratio
          context.scale(outputScale, outputScale);

          const renderContext = {
            canvasContext: context,
            viewport,
          };

          await page.render(renderContext).promise;
        }
      }
    };

    loadPDF();
  }, [decodedLink]);

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
            className=" text-[#8B28D2] text-sm border-2 border-solid border-[#8B28D2] hover:bg-[#8B28D2] hover:text-white p-[8px] rounded-lg"
          >
            Download from Walrus
          </a>
        </div>
        {/* {canvasRefs.current.length === 0 ? (
          <Spinner />
        ) : ( */}
        <div className="relative w-full flex flex-col items-center overflow-auto">
          {Array.from({ length: numPages || 0 }, (_, index) => (
            <canvas
              key={index}
              ref={(el) => (canvasRefs.current[index] = el)}
              className="border my-2 w-full max-w-screen-sm"
            />
          ))}
        </div>
        {/* )} */}
      </div>
      <Footer />
    </div>
  );
};

export default PDFViewerPage;
