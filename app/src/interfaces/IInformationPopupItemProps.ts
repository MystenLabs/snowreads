export interface IInformationPopupItemProps {
  iconSrc: string;
  iconAlt: string;
  iconBgColor: string;
  iconSize: string;
  title: string;
  description: string;
  accordionContent: any;
  isOpen: boolean;
  onToggle: () => void;
}
