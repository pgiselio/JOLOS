import styled from "styled-components";

export const TabSelectorStyle = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  padding: 3px;
  display: flex;
  align-items: center;
  border-radius: 2px;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  border-top-width: 2px;
  position: relative;
  letter-spacing: ${props => props.isActive ? "0px" : ".2px"};
  font-weight: ${props => props.isActive ? "700" : "500"};
  font-size: 15px;
  height: 100%;
  color:  ${props => props.isActive ? "var(--text-a)" : "var(--text-b)"};
  &::after {
    content: " ";
    width: 100%;
    height: ${props => props.isActive ? "2px" : "0"};
    background-color: var(--accent-color);
    position: absolute;
    bottom: -2px;
    left: 0;
    transition: height 0.2s ease-in;
  }
  &:hover {
    color: var(--text-a);
    border-bottom-color: #ccc;
  }
`;
