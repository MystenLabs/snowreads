import { Link } from "react-router-dom";
import { ICategoryCardProps } from "../../interfaces/ICategoryCardProps";
import { formatBytes } from "../../tools/utils";

const CategoryCard: React.FC<ICategoryCardProps> = ({
  icon,
  title,
  documents,
  size,
  className,
}) => {
  return (
    <Link
      to={`/collection/${title}`}
      className={`block p-4 rounded-lg text-center min-h-[180px] bg-white relative transform transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer overflow-hidden
        w-full sm:w-full md:w-[90%] lg:w-auto ${className}`}
    >
      {/* Conditionally apply the background images for different titles */}
      {title === "Scientific Wonder of Pop Culture" && (
        <div
          className="absolute bottom-[-6px] right-0 w-[110px] h-[110px] bg-no-repeat bg-contain"
          style={{ backgroundImage: `url('/disc_bg.png')` }}
        />
      )}
      {title === "The Science of Everyday Decisions" && (
        <div
          className="absolute bottom-[-20px] right-[-30px] w-[150px] h-[150px] bg-no-repeat bg-contain"
          style={{ backgroundImage: `url('/laptop_bg.png')` }}
        />
      )}
      {title === "Is AI Fun?" && (
        <div
          className="absolute bottom-[2px] right-[-87px] w-[180px] h-[180px] bg-no-repeat bg-contain"
          style={{ backgroundImage: `url('/globe_bg.png')` }}
        />
      )}

      <div className="flex py-2">
        <div className="w-11 h-11 rounded-lg bg-teal-100 flex items-center justify-center mr-4">
          <img src={icon} alt={`${title} icon`} className="w-5 h-5" />
        </div>
        <div className="text-left max-w-[80%]">
          <p className="text-xl font-semibold text-gray-800  ">{title}</p>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex w-full pr-4 text-xs text-gray-500">
        <span>{documents} Documents</span>
        <span className="ml-5">{formatBytes(size)}</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
