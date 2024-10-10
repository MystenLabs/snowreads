import { useState, useEffect } from "react";
import { ISidebarNavProps } from "../../interfaces/ISidebarNavProps";
import { useNavigate, useParams } from "react-router-dom";

const SidebarNav: React.FC<ISidebarNavProps> = ({
  sections,
  initialActive = "",
  label,
  mode = "redirect", // Default mode is redirect
}) => {
  const [activeLink, setActiveLink] = useState(
    initialActive || sections[0]?.id || ""
  );
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    if (initialActive) {
      setActiveLink(initialActive);
    }
  }, [initialActive]);

  const handleLinkClick = (sectionId: string) => {
    setActiveLink(sectionId);

    if (mode === "redirect") {
      // Redirect mode: Update URL with anchor link
      window.location.hash = sectionId; // Using hash to navigate to the section
    } else if (mode === "fetch") {
      // Fetch mode: Update URL and fetch the data, without using # symbol
      if (category) {
        // Use navigate to change the URL and avoid adding #
        navigate(`/category/${category}/${sectionId}`, { replace: true });
      }
    }
  };

  return (
    <nav className="p-4 flex-col w-full md:w-[250px] hidden md:flex">
      {label === "COLLECTIONS" ? (
        <h2 className="text-lg font-semibold mb-6">COLLECTIONS</h2>
      ) : label === "CATEGORIES" ? (
        <h2 className="text-lg font-semibold mb-6">CATEGORIES</h2>
      ) : (
        <h2 className="text-lg font-semibold mb-6">CONTENTS</h2>
      )}

      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              className={`${
                activeLink === section.id ? `text-[#8B28D2]` : `text-gray-900`
              } hover:text-[#8B28D2] cursor-pointer`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default action
                handleLinkClick(section.id);
              }}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
