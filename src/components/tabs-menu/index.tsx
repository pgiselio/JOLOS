import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { TabsMenuItemStyle, TabsMenuStyle } from "./styles";
type TabsMenuType = {
  isOntop?: boolean;
  children: ReactNode;
};
type TabsMenuItemType = {
  to: string;
  title: string;
  highlighted?: string;
  end?: boolean;
};
export function TabsMenu({ children, isOntop }: TabsMenuType) {
  return (
    <TabsMenuStyle isOnTop={isOntop}>
      {!isOntop && <div className="spacer"></div>}

      <div className="tabs-menu-container">
        <ul>{children}</ul>
      </div>
    </TabsMenuStyle>
  );
}

export function TabsMenuItem({
  to,
  title,
  highlighted,
  end,
}: TabsMenuItemType) {
  return (
    <TabsMenuItemStyle>
      <NavLink to={to} end={end}>
        {title}
        {highlighted && <span>{highlighted}</span>}
      </NavLink>
    </TabsMenuItemStyle>
  );
}
