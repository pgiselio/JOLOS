export interface AppOptionsContextType {
  theme: string;
  setTheme: (theme: string) => void;
  sidebarState: boolean;
  toggleSidebar: () => void;
};
