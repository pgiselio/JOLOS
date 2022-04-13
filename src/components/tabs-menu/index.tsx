import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { NavLink } from "react-router-dom";
import { CSSProperties } from "styled-components";
import { TabsMenuItemStyle, TabsMenuStyle } from "./styles";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

type TabsMenuType = {
  isOntop?: boolean;
  children: any;
  style?: CSSProperties;
  sticky?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
};
type TabsMenuItemType = {
  to: string;
  title: string;
  highlighted?: string;
  end?: boolean;
};

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  
  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

export function TabsMenu({
  children,
  isOntop,
  style,
  sticky,
  size,
  className,
}: TabsMenuType) {
  return (
    <TabsMenuStyle isOnTop={isOntop} sticky={sticky} size={size} style={style}>
      {!isOntop && <div className="spacer"></div>}

      <div className={`tabs-menu-container ${className}`}>
        <ul>
          <ScrollMenu>
            {children}
          </ScrollMenu>
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
  const key = `item-${title}`;
  
  return (
    <TabsMenuItemStyle key={key} itemID={key}>
      <NavLink to={to} end={end} tabIndex={0}>
        {title}
        {highlighted && <span>{highlighted}</span>}
      </NavLink>
    </TabsMenuItemStyle>
  );
}

