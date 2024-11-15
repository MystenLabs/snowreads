import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary border-t border-gray-300 p-5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 w-full relative md:sticky md:bottom-0">
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
        <p className="text-center md:text-left">
          Copyright {new Date().getFullYear()} © Mysten Labs, Inc.
        </p>
        <div className="flex space-x-4 justify-center">
          <Link to="/terms-of-service" className="underline">
            Terms of Service
          </Link>
          <Link to="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="flex space-x-6 justify-center items-center">
        <a
          href="https://x.com/WalrusProtocol"
          aria-label="X"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/x_logo.png"
            alt="X logo"
            className="w-6 h-6 hover:opacity-80"
          />
        </a>
        <a
          href="https://discord.com/invite/walrusprotocol"
          aria-label="Discord"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/discord_logo.png"
            alt="Discord logo"
            className="w-7 h-7 hover:opacity-80"
          />
        </a>
        <a
          href="https://github.com/MystenLabs/snowreads"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/github_logo.png"
            alt="GitHub logo"
            className="w-6 h-6 hover:opacity-80"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
