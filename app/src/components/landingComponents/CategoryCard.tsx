import { Link } from "react-router-dom";
import { ICategoryCardProps } from "../../interfaces/ICategoryCardProps";
import { formatBytes } from "../../tools/utils";

const CategoryCard: React.FC<ICategoryCardProps> = ({
  icon,
  category,
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
      {/* Conditionally apply the background images for different categories */}
      {category === "Computer Science" && (
        <div
          className="absolute bottom-[-6px] right-0 w-[110px] h-[110px] bg-no-repeat bg-contain"
          style={{ backgroundImage: `url('/disc_bg.png')` }}
        />
      )}
      {category === "Mathematics" && (
        <div
          className="absolute bottom-[10px] right-[-73px] w-[150px] h-[150px] bg-no-repeat bg-contain"
          style={{ backgroundImage: `url('/globe_bg.png')` }}
        />
      )}
      {category === "Statistics" && (
        <div
          className="absolute bottom-[5px] right-[-84px] w-[170px] h-[170px] bg-no-repeat bg-contain"
          style={{ backgroundImage: `url('/folder_bg.png')` }}
        />
      )}
      {category === "Quantitative Finance" && (
        <div
          className="absolute bottom-[-17px] right-0 w-[130px] h-[130px] bg-no-repeat bg-contain"
          style={{ backgroundImage: `url('/laptop_bg.png')` }}
        />
      )}
      <div className="flex">
        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mr-4">
          <img src={icon} alt={`${category} icon`} className="w-4 h-4" />
        </div>
        <div className="text-left max-w-[80%]">
          <span className="text-sm text-gray-500 block">{category}</span>
          <p className="text-lg font-semibold text-gray-800 py-1 ">{title}</p>
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
