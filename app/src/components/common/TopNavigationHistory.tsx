import { ITopNavigationHistoryProps } from "../../interfaces/ITopNavigationHistoryProps";

const TopNavigationHistory: React.FC<ITopNavigationHistoryProps> = ({
  categories,
  subcategories,
}) => {
  return (
    <nav className="py-4 px-5 overflow-hidden">
      <ul className="flex items-center text-sm md:text-base w-full space-x-1">
        <li>
          <a
            href="/"
            className="text-gray-600 hover:text-gray-800 whitespace-nowrap"
          >
            Home
          </a>
        </li>
        {categories.map((category, index) => (
          <li key={index} className="flex items-center">
            <img
              src="/arrow_right_icon.png"
              alt="arrow icon"
              className="w-4 h-4"
            />
            <a
              href={`/category/${category}`}
              className="text-gray-600 hover:text-gray-800 whitespace-nowrap truncate ml-1"
            >
              {category}
            </a>
          </li>
        ))}
        {/* Subcategory Navigation (if available) */}
        {subcategories &&
          subcategories.map((subcategory, index) => (
            <li key={index} className="flex items-center">
              <img
                src="/arrow_right_icon.png"
                alt="arrow icon"
                className="w-4 h-4"
              />
              <a
                href={`/category/${categories[0]}/${subcategory}`}
                className="text-gray-600 hover:text-gray-800 whitespace-nowrap truncate ml-1"
              >
                {subcategory}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default TopNavigationHistory;
