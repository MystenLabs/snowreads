import React, { useState } from 'react';

const SidebarNav: React.FC = () => {
  const [activeLink, setActiveLink] = useState('article');

  const handleLinkClick = (section: string) => {
    setActiveLink(section);
  };

  return (
    <nav className="w-1/5 p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-6">CONTENTS</h2>
      <ul className="space-y-4">
        <li>
          <a
            href="#article"
            className={`${
              activeLink === 'article' ? 'text-[#8B28D2]' : 'text-gray-900'
            } hover:text-[#8B28D2]`}
            onClick={() => handleLinkClick('article')}
          >
            Article
          </a>
        </li>
        <li>
          <a
            href="#subjects"
            className={`${
              activeLink === 'subjects' ? 'text-[#8B28D2]' : 'text-gray-900'
            } hover:text-[#8B28D2]`}
            onClick={() => handleLinkClick('subjects')}
          >
            Subjects
          </a>
        </li>
        <li>
          <a
            href="#cite-as"
            className={`${
              activeLink === 'cite-as' ? 'text-[#8B28D2]' : 'text-gray-900'
            } hover:text-[#8B28D2]`}
            onClick={() => handleLinkClick('cite-as')}
          >
            Cite As
          </a>
        </li>
        <li>
          <a
            href="#submission-history"
            className={`${
              activeLink === 'submission-history' ? 'text-[#8B28D2]' : 'text-gray-900'
            } hover:text-[#8B28D2]`}
            onClick={() => handleLinkClick('submission-history')}
          >
            Submission History
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`${
              activeLink === 'more' ? 'text-[#8B28D2]' : 'text-gray-900'
            } hover:text-[#8B28D2]`}
            onClick={() => handleLinkClick('more')}
          >
            More
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
