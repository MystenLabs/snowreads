import { useEffect, useState } from "react";
import { IAccessPaperCardProps } from "../../interfaces/IAccessPaperCardProps";

const AccessPaperCard: React.FC<IAccessPaperCardProps> = ({
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
    <aside
      className="md:w-[180px] "
      style={
        isLargeScreen && dynamicMarginTop
          ? { marginTop: `${dynamicMarginTop - 80}px` }
          : {}
      }
    >
      <div className="bg-white p-4  rounded-lg border border-black">
        <h2 className="text-lg font-medium mb-4 border-b border-gray-300 pb-2">
          Access paper
        </h2>
        <ul className="space-y-2 ">
          <li>
            <a
              href={fullPaperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline"
            >
              View PDF
            </a>
          </li>
          {/* <li>
            <a 
              href={formatsLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black hover:underline"
            >
              Other Formats
            </a>
          </li> */}
          {/* <li>
            <a
              href={licenseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline"
            >
              View License
            </a>
          </li> */}
        </ul>
        {/* <h2 className="text-lg font-medium mb-4 border-b border-gray-300 pb-2">References & Citation</h2>
        <ul className="space-y-2 mb-6">
          {references.map((ref, index) => (
            <li key={index}>
              <a 
                href={ref.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black hover:underline"
              >
                {ref.name}
              </a>
            </li>
          ))}
        </ul> */}
        {/* <a 
          href={bookmarkLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-black hover:underline"
        >
          Bookmark
        </a>
        <div className="mt-4 flex space-x-4">
          <a href={redditAddress} target="_blank" rel="noopener noreferrer">
            <img src='/reddit.png' alt="Reddit" className="w-6 h-6" />
          </a>
          <a href={kdeAddress} target="_blank" rel="noopener noreferrer">
            <img src='/kde.png' alt="Kde" className="w-6 h-6" />
          </a>
        </div> */}
      </div>
    </aside>
  );
};

export default AccessPaperCard;
