import { useEffect, useState } from "react";
import { IDownloadPDFButtonProps } from "../../interfaces/IDownloadPDFButtonProps";

const DownloadPDFButton: React.FC<IDownloadPDFButtonProps> = ({
  fullPaperLink,
  dynamicMarginTop,
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    // Function to check screen size and set the flag
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // Set breakpoint for large screens
    };

    // Check screen size on initial render
    checkScreenSize();

    // Add event listener to handle window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div
      className="md:w-[180px]"
      style={
        isLargeScreen && dynamicMarginTop
          ? { marginTop: `${dynamicMarginTop - 80}px` }
          : {}
      }
    >
      <a href={fullPaperLink} target="_blank" rel="noopener noreferrer">
        <button className="w-full  text-[#8B28D2] border-2 border-solid border-[#8B28D2] hover:bg-[#8B28D2] hover:text-white p-2 rounded-lg">
          Download PDF
        </button>
      </a>
    </div>
  );
};

export default DownloadPDFButton;
