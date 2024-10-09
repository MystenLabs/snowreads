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
      // Default behavior - just update the anchor link
      window.location.href = `#${sectionId}`;
    } else if (mode === "fetch") {
      // Change the URL and trigger a re-fetch based on the selected subcategory
      if (category) {
        // Update the URL with the selected subcategory
        navigate(`/category/${category}/${sectionId}`);
      }
    }
  };

  return (
    <nav className="p-4 flex-col w-full md:w-1/4 hidden md:flex">
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
              href={`#${section.id}`}
              className={`${
                activeLink === section.id ? `text-[#8B28D2]` : `text-gray-900`
              } hover:text-[#8B28D2]`}
              onClick={() => handleLinkClick(section.id)}
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
