import React from "react";
import { IInformationPopupItemProps } from "../../interfaces/IInformationPopupItemProps";

const FeatureItem: React.FC<IInformationPopupItemProps> = ({
  iconSrc,
  iconAlt,
  iconBgColor,
  iconSize,
  title,
  description,
  accordionContent,
  isOpen,
  onToggle,
}) => {
  return (
    <li className="flex flex-col">
      <div
        className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-md cursor-pointer"
        onClick={onToggle}
      >
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${iconBgColor} flex items-center justify-center`}
        >
          <img src={iconSrc} alt={iconAlt} className={iconSize} />
        </div>

        {/* Title and Description */}
        <div className="flex flex-col flex-1">
          <h3 className="text-sm sm:text-base font-medium">{title}</h3>
          <p className="text-[10px] sm:text-xs">{description}</p>
        </div>

        {/* Arrow SVG - Rotate based on accordion state */}
        <svg
          className={`w-5 h-5 ml-2 -mr-1 text-gray-400 transition-transform transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Accordion Content - Only visible when open */}
      {isOpen && (
        <div className="px-5 -mt-2 bg-white p-3 rounded-b-lg">
          {accordionContent.map((paragraph: string, index: number) => (
            <p key={index} className="text-[10px] sm:text-xs">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </li>
  );
};

export default FeatureItem;
