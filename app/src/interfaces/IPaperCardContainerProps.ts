export interface IPaperCardContainerProps {
  children: React.ReactNode;
  category?: string;
  cardTitle: string;
  hasActionButton?: boolean;
  count?: number;
  size?: number;
  maxHeight?: string;
}
