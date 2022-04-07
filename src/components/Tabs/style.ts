import styled from "styled-components";

export const TabSelectorStyle = styled.button<{ isActive: boolean, vertical?: boolean,}>`
  background: transparent;
  border: none;
  padding:  ${props => props.vertical ? "10px 3px" : "3px"};
  display: flex;
  align-items: center;
  border-radius: 2px;
  text-decoration: none;
  border: 2px solid transparent;
  border-top-width: 2px;
  position: relative;
  letter-spacing: ${props => props.isActive ? ".1px" : (props.vertical ? ".3px" : ".3px")};
  font-weight: ${props => props.isActive ? "700" : "500"};
  font-size: 15px;
  height: 100%;
  color:  ${props => props.isActive ? "var(--text-a)" : "var(--text-b)"};
  gap: 5px;
  i{
    width: 25px;
    text-align: left;
  }
  &::after {
    content: " ";
    width: ${props =>  props.vertical ? (props.isActive ? "2px" : "0") : "100%"};
    height: ${props => props.isActive ? (props.vertical ? "100%" : "2px") : "0"};
    background-color: var(--accent-color);
    position: absolute;
    bottom:  ${props => props.vertical ? "0" : "-2px"};
    ${props => props.vertical ? "right: -2px;" : "left: 0;"}
    
    transition: ${props => props.vertical ? "width" : "height"} 0.2s ease-in-out;
  }
  &:hover {
    color: var(--text-a);
    ${props => props.vertical ? "border-right-color: var(--outline-color);" : "border-bottom-color: var(--outline-color);"};
  }
`;
