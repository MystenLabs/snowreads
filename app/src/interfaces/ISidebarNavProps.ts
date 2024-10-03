export interface ISidebarNavProps {
    sections: Array<{
      id: string;
      label: string;
      url?: string;
    }>;
    initialActive?: string;
    activeColor?: string;
    inactiveColor?: string;
    hoverColor?: string;
    type: string;
    useExternalLink?: boolean;
  }