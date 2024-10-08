import { useState, useEffect } from "react";
import { ISidebarNavProps } from "../../interfaces/ISidebarNavProps";
import { useNavigate, useParams } from "react-router-dom";

const SidebarNav: React.FC<ISidebarNavProps> = ({
  sections,
  initialActive = "",
  type,
  activeColor = "#8B28D2",
  inactiveColor = "gray-900",
  hoverColor = "#8B28D2",
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
      <h2 className="text-lg font-semibold mb-6">{type}</h2>
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`${
                activeLink === section.id
                  ? `text-[${activeColor}]`
                  : `text-${inactiveColor}`
              } hover:text-[${hoverColor}]`}
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
