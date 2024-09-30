import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary border-t border-gray-300 p-5 flex justify-between items-center w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
        <p>Copyright {new Date().getFullYear()} © Mysten Labs, Inc.</p>
        <div className="flex space-x-6">
            <Link to="/terms" className="underline">Terms of Service</Link>
            <Link to="/privacy" className="underline">Privacy Policy</Link>
        </div>
      </div>
      <div className="flex space-x-8 items-center">
        <a href="https://twitter.com" aria-label="X" target="_blank" rel="noopener noreferrer">
          <img 
            src="/x_logo.png" 
            alt="X logo" 
            className="w-6 h-6 hover:opacity-80"
          />
        </a>
        <a href="https://discord.com" aria-label="Discord" target="_blank" rel="noopener noreferrer">
          <img 
            src="/discord_logo.png" 
            alt="Discord logo" 
            className="w-6 h-5 hover:opacity-80"
          />
        </a>
        <a href="https://github.com/MystenLabs/wal-papers" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <img 
            src="/github_logo.png" 
            alt="GitHub logo" 
            className="w-7 h-7 hover:opacity-80"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
