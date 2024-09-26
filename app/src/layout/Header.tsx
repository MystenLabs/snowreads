import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-[#E4F0EF] border-b border-gray-300">
      <div className="flex items-center p-4">
      <div className="logo">
          <img src="/logo.png" alt="Walrus Arxiv Logo" className="h-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;
