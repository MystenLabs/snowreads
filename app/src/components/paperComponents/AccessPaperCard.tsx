import React from 'react';

interface AccessPaperCardProps {
  fullPaperLink: string;
  formatsLink: string;
  licenseLink: string;
  references: Array<{ name: string; link: string }>;
  bookmarkLink: string;
  redditAddress: string;
  kdeAddress: string;
}

const AccessPaperCard: React.FC<AccessPaperCardProps> = ({
  fullPaperLink,
  formatsLink,
  licenseLink,
  references,
  bookmarkLink,
  redditAddress,
  kdeAddress,
}) => {
  return (
    <aside className="w-1/5 px-4">
      <div className="bg-white p-4 shadow-lg rounded-lg border border-black">
        <h2 className="text-lg font-medium mb-4 border-b border-gray-300 pb-2">Access paper</h2>
        <ul className="space-y-2 mb-6">
          <li>
            <a 
              href={fullPaperLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black hover:underline"
            >
              View Full Paper
            </a>
          </li>
          <li>
            <a 
              href={formatsLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black hover:underline"
            >
              Other Formats
            </a>
          </li>
          <li>
            <a 
              href={licenseLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black hover:underline"
            >
              View License
            </a>
          </li>
        </ul>
        <h2 className="text-lg font-medium mb-4 border-b border-gray-300 pb-2">References & Citation</h2>
        <ul className="space-y-2 mb-6">
          {references.map((ref, index) => (
            <li key={index}>
              <a 
                href={ref.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black hover:underline"
              >
                {ref.name}
              </a>
            </li>
          ))}
        </ul>
        <a 
          href={bookmarkLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-black hover:underline"
        >
          Bookmark
        </a>
        <div className="mt-4 flex space-x-4">
          <a href={redditAddress} target="_blank" rel="noopener noreferrer">
            <img src='/reddit.png' alt="Reddit" className="w-6 h-6" />
          </a>
          <a href={kdeAddress} target="_blank" rel="noopener noreferrer">
            <img src='/kde.png' alt="Kde" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default AccessPaperCard;
