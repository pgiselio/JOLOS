import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { CSSProperties } from "styled-components";
import { TabsMenuItemStyle, TabsMenuStyle } from "./styles";
type TabsMenuType = {
  isOntop?: boolean;
  children: ReactNode;
  style?: CSSProperties;
  sticky?: boolean;
  size?: "small" | "medium" | "large";
};
type TabsMenuItemType = {
  to: string;
  title: string;
  highlighted?: string;
  end?: boolean;
};
export function TabsMenu({ children, isOntop, style, sticky, size }: TabsMenuType) {
  return (
    <TabsMenuStyle isOnTop={isOntop} sticky={sticky} size={size} style={style}>
      {!isOntop && <div className="spacer"></div>}

      <div className="tabs-menu-container">
        <ul>
          {children}
        </ul>
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
