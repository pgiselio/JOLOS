import * as React from "react";
import { TabSelectorStyle } from "./style";
type TabSelectorProps = {
  isActive: boolean;
  children: React.ReactNode;
  vertical?: boolean
  className?: string;
  onClick: () => void;
}
export const TabSelector = ({
  isActive,
  children,
  onClick,
  vertical,
  className,
}: TabSelectorProps) => (
  <TabSelectorStyle isActive={isActive}
    onClick={onClick}
    vertical={vertical}
    className={className}
  >
    {children}
  </TabSelectorStyle>
);

