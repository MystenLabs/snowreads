import { useEffect, useState } from "react";

const BackToTopButton: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check the screen size on load and resize
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener to handle window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const scrollToTop = () => {
    console.log("Scrolling to top, current scroll position:", window.scrollY);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isMobile && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-[120px] right-8 sm:bottom-[120px] sm:right-8 md:bottom-20 md:right-6 lg:bottom-20 lg:right-6 rounded-full shadow-lg bg-quaternary p-4 z-50 transition-colors duration-300 focus:outline-none"
      >
        <span className="text-white text-lg">↑</span>
      </button>
    )
  );
};

export default BackToTopButton;
