import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-primary border-b border-gray-300">
      <div className="flex items-center p-4">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="SnowReads Logo" className="h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
