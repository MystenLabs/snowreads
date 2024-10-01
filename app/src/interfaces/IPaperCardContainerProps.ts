export interface IPaperCardContainerProps {
    children: React.ReactNode;
    documentCount: number;
    sinceYear: number;
    onFilterChange: (filter: string) => void;
    activeFilter: string;
  }