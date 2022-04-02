import styled from "styled-components";
import { PillItemStyle } from "./style";

export const PillList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
`;
type PillItemType = {
    className?:string;
    children?: React.ReactNode; 
    [x:string] : any;
}
export function PillItem({ className, children, ...rest }: PillItemType ) {
  return (
    <PillItemStyle>
      <div className={`pill-item ${className}`} {...rest}>{children}</div>
    </PillItemStyle>
  );
}
