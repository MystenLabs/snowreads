import { useState, useEffect } from "react";
import { ISidebarNavProps } from "../../interfaces/ISidebarNavProps";

const SidebarNav: React.FC<ISidebarNavProps> = ({
  sections,
  initialActive = "",
  type,
  activeColor = "#8B28D2",
  inactiveColor = "gray-900",
  hoverColor = "#8B28D2",
}) => {
  const [activeLink, setActiveLink] = useState(
    initialActive || sections[0]?.id || ""
  );

  useEffect(() => {
    if (initialActive) {
      setActiveLink(initialActive);
    }
  }, [initialActive]);

  const handleLinkClick = (sectionId: string) => {
    setActiveLink(sectionId);
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
