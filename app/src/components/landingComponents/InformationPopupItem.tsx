import { IInformationPopupItemProps } from "../../interfaces/IInformationPopupItemProps";


const FeatureItem: React.FC<IInformationPopupItemProps> = ({ number, iconSrc, iconAlt, iconBgColor, iconSize, title, description }) => {
  return (
    <li className="flex items-center space-x-4 p-4 bg-white rounded-md">
      <p className="text-sm pl-1">{number}.</p>
      <div className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center mr-4`}>
        <img src={iconSrc} alt={iconAlt} className={iconSize} />
      </div>
      <div className="flex flex-col">
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs">{description}</p>
      </div>
    </li>
  );
};

export default FeatureItem;
