import { IInformationPopupItemProps } from "../../interfaces/IInformationPopupItemProps";

const FeatureItem: React.FC<IInformationPopupItemProps> = ({ number, iconSrc, iconAlt, iconBgColor, iconSize, title, description }) => {
  return (
    <li className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-md">
      <p className="text-xs sm:text-sm pl-1">{number}.</p>
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${iconBgColor} flex items-center justify-center mr-3 sm:mr-4`}>
        <img src={iconSrc} alt={iconAlt} className={iconSize} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm sm:text-base font-medium">{title}</h3>
        <p className="text-[10px] sm:text-xs">{description}</p>
      </div>
    </li>
  );
};

export default FeatureItem;
