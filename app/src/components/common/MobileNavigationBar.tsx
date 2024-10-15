import { useState, useEffect } from "react";
import { IMobileNavigationBarProps } from "../../interfaces/ISidebarNavProps";
import { useNavigate, useParams } from "react-router-dom";

const MobileNavigationBar: React.FC<IMobileNavigationBarProps> = ({
  options,
  label,
  initialActive,
  mode = "scroll", // Default mode is scroll
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();
  const { category } = useParams(); // Get the category from the URL

  useEffect(() => {
    // Update the selected option based on the URL category parameter
    if (category) {
      const matchingOption = options.find((opt) => opt.id === category);
      if (matchingOption) {
        setSelectedOption(matchingOption.id); // Set selected option based on URL
      }
    } else if (options.length > 0) {
      // Default to the first option if no category in URL
      setSelectedOption(options[0].id);
    }
  }, [category, options]);

  const handleOptionClick = (id: string) => {
    setSelectedOption(id);
    setIsOpen(false);

    if (mode === "scroll") {
      // Default behavior - scroll to the target element
      const targetElement = document.getElementById(id);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else if (mode === "fetch") {
      // Change the URL and trigger a re-fetch based on the selected subcategory
      if (category) {
        if (label === "COLLECTIONS") {
          // Use navigate to change the URL and avoid adding #
          navigate(`/collection/${id}`, { replace: true });
        } else {
          // Use navigate to change the URL and avoid adding #
          navigate(`/category/${category}/${id}`, { replace: true });
        }
      }
    }
  };

  return (
    <div className="relative w-full text-left md:hidden py-5">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none"
        >
          {/* Display the label of the selected option */}
          {selectedOption
            ? options.find((opt) => opt.id === selectedOption)?.label
            : initialActive}
          <svg
            className="w-5 h-5 ml-2 -mr-1 text-gray-400"
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
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 max-h-48 overflow-y-scroll" // Set fixed height and make it scrollable
            role="menu"
          >
            {options.map((option) => (
              <a
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                role="menuitem"
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavigationBar;
