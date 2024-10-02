export interface ISidebarNavProps {
    sections: Array<{
      id: string;
      label: string;
    }>;
    initialActive?: string;
    activeColor?: string;
    inactiveColor?: string;
    hoverColor?: string;
    type: string;
  }