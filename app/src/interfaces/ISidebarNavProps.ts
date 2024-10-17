export interface ISidebarNavProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
  initialActive?: string;
  label: string;
  mode?: "redirect" | "fetch";
  enlargeWidth?: boolean;
}
export interface IMobileNavigationBarProps {
  options: { label: string; id: string }[];
  mode?: "scroll" | "fetch";
  label: string;
  initialActive?: string;
}
