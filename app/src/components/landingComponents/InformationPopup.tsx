import { useState, useRef, useEffect } from "react";
import InformationPopupItem from "./InformationPopupItem";
import Button from "../common/Button";

const InformationPopup: React.FC = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Add a reference for the button
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
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
        setIsOpen(false);
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
  }, [isOpen]);

  // Listen to esc key to close pop-up
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
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
        className={`fixed bottom-40 right-8 sm:bottom-40 sm:right-8 md:bottom-20 md:right-6 lg:bottom-20 lg:right-6 rounded-full shadow-lg z-50 ${isOpen ? "bg-black" : ""}`}
      >
        <img
          src={isOpen ? "/x_icon.png" : "/walrus_popup.png"}
          alt="Walrus logo"
          className="w-12 h-12"
        />
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          className="fixed bottom-[220px] right-[20px] sm:bottom-[220px] md:bottom-[140px] lg:bottom-[140px] bg-secondary p-4 sm:p-5 rounded-lg shadow-lg border border-black z-50 w-[90%] sm:w-[530px] max-w-full"
        >
          <h2 className="text-lg sm:text-2xl font-medium mb-3 sm:mb-4">
            How Walrus Works
          </h2>
          <ul className="space-y-1 sm:space-y-2">
            <InformationPopupItem
              number="1"
              iconSrc="/dollar_sign_icon.png"
              iconAlt="Price"
              iconBgColor="bg-tertiary"
              iconSize="w3 h-4"
              title="Price is Right"
              description="Store gigabytes of data at a reasonable cost"
            />
            <InformationPopupItem
              number="2"
              iconSrc="/double_check_icon.png"
              iconAlt="Reliability"
              iconBgColor="bg-quaternary"
              iconSize="w-5 h-3"
              title="Reliably yours"
              description="Access your data, even during a zombie apocalypse"
            />
            <InformationPopupItem
              number="3"
              iconSrc="/lightning_icon.png"
              iconAlt="Fast"
              iconBgColor="bg-tertiary"
              iconSize="w-3 h-4"
              title="Lightning-fast"
              description="High performance reads and writes for any application"
            />
            <InformationPopupItem
              number="4"
              iconSrc="/code_tag_icon.png"
              iconAlt="Programmable"
              iconBgColor="bg-quaternary"
              iconSize="w-4 h-3"
              title="Programmable"
              description="Buy, trade, and version your storage resources as you like"
            />
          </ul>
          <div className="flex flex-col sm:flex-row justify-between mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
            <Button content={"LEARN MORE"} href="https://www.walrus.xyz/" />
            <Button
              content={"GET STARTED"}
              primary
              href="https://discord.com/invite/walrusprotocol"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InformationPopup;
