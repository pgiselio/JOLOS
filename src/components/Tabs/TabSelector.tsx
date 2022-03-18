import * as React from "react";
import { TabSelectorStyle } from "./style";

export const TabSelector = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <TabSelectorStyle isActive={isActive}
    onClick={onClick}
  >
    {children}
  </TabSelectorStyle>
);

