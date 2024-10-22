import { useState, useRef, useEffect } from "react";
import Button from "../common/Button";
import FeatureItem from "./InformationPopupItem";

const InformationPopup: React.FC<{
  isOpen?: boolean;
  togglePopup?: () => void;
}> = ({ isOpen: externalIsOpen, togglePopup: externalTogglePopup }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Internal state management for standalone mode
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use external props if provided, otherwise fallback to internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const togglePopup =
    externalTogglePopup || (() => setInternalIsOpen((prev) => !prev));

  // Manage which accordion is open
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    0
  ); // Open the first by default

  // Function to handle the accordion opening/closing
  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index)); // Close if clicked again
  };

  // Close pop-up when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        event.target instanceof Node &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) // Ignore clicks on the button itself
      ) {
        togglePopup();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, togglePopup]);

  // Listen to esc key to close pop-up
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        togglePopup();
      }
    }
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={togglePopup}
        className={`fixed bottom-[20px] right-8 sm:bottom-[20px] sm:right-8 md:bottom-20 md:right-6 lg:bottom-20 lg:right-6 rounded-full shadow-xl z-50 ${isOpen ? "bg-black" : "bg-white"}`}
      >
        {isOpen ? (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#0C0F1D]">
            <img src="/x_icon.png" alt="Close button" className="w-10 h-10" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-tertiary">
            <img src="/icon.png" alt="Walrus globe" className="w-7 h-7" />
          </div>
        )}
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          className="fixed bottom-[180px] right-[20px] sm:bottom-[180px] md:bottom-[140px] lg:bottom-[140px] bg-secondary p-4 sm:p-5 rounded-lg shadow-lg border border-black z-50 w-[90%] sm:w-[530px] max-w-full"
        >
          <h2 className="text-lg sm:text-2xl font-medium mb-3 sm:mb-4">
            About SnowReads
          </h2>
          <ul className="space-y-1 sm:space-y-2">
            <FeatureItem
              iconSrc="/icon.png"
              iconAlt="SnowReads Icon"
              iconBgColor="bg-tertiary"
              iconSize="w-5 h-5"
              title="SnowReads"
              description="Curated collections of scientific papers stored on Walrus."
              accordionContent={[
                "SnowReads is a series of curated collections of scientific papers, built with Walrus Sites, a platform that allows users to publish websites directly on Walrus, a decentralized data storage network.",
                "Everything on this site—from the HTML to the images and the PDF files themselves—is stored on Walrus, demonstrating how Walrus Sites makes it easy to turn data blobs into high-quality user experiences.",
                "SnowReads illustrates how Walrus and Walrus Sites can enable digital archives to preserve content for the long term while remaining globally accessible, secure, and resistant to data loss or censorship.",
              ]}
              isOpen={openAccordionIndex === 0} // Open if the index matches
              onToggle={() => handleAccordionToggle(0)} // Toggle function for this item
            />

            <FeatureItem
              iconSrc="/walrus_sites_icon.png"
              iconAlt="Fast"
              iconBgColor="bg-quaternary"
              iconSize="w-7 h-7"
              title="Walrus Sites"
              description="Web sites hosted entirely on Walrus."
              accordionContent={[
                "Walrus Sites take decentralized storage to the next level by allowing users to host websites entirely on Walrus. Once deployed, a Walrus Site exists on the decentralized network, accessible from anywhere in the world through portals like walrus.site. These sites can also be linked to objects on Sui and additionally leverage Sui’s naming service, SuiNS, allowing each site to have a human-readable name instead of a long, complex URL.",
              ]}
              isOpen={openAccordionIndex === 2} // Open if the index matches
              onToggle={() => handleAccordionToggle(2)} // Toggle function for this item
            />

            <FeatureItem
              iconSrc="/walrus_icon.png"
              iconAlt="Reliability"
              iconBgColor="bg-tertiary"
              iconSize="w-6 h-6"
              title="Walrus"
              description="Decentralized data storage network."
              accordionContent={[
                "Walrus is a decentralized data storage network. Unlike traditional cloud storage systems that rely on centralized providers, Walrus splits data into smaller pieces and distributes it across multiple nodes globally. This decentralization ensures that data is highly available and resilient to failures. Even if parts of the network go offline, the system can still retrieve complete data.",
                "Walrus represents the next generation of decentralized data storage, built with learnings from the successes and challenges of earlier protocols like Filecoin and Arweave. Walrus offers fast writes and reads, as well as deletable blobs. Using the Sui Blockchain as a coordination layer, storage capacity is programmable and can be maintained and extended via smart contracts.",
              ]}
              isOpen={openAccordionIndex === 1} // Open if the index matches
              onToggle={() => handleAccordionToggle(1)} // Toggle function for this item
            />
          </ul>
          <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
            <Button content={"LEARN MORE"} href="https://www.walrus.xyz/" />
            <Button
              content={"GET STARTED"}
              primary
              href="https://docs.walrus.site/walrus-sites/intro.html"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InformationPopup;
