import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 8px 20px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  transition: 0.1s linear;
  background: var(--accent-color);
  border: 2px solid var(--accent-color);
  color: #fff;
  :hover {
    background: var(--accent-color-active);
    border: 2px solid var(--accent-color-active);
  }
  i:first-child{
    padding-right: 5px;
  }
  i:last-child{
    padding-left: 5px;
  }
  &.less-radius {
    border-radius: 10px;
  }
  &.outlined {
    color: var(--accent-color);
    border: 2px solid var(--accent-color);
    background: transparent;
    :hover {
      background: var(--accent-color-opacity);
    }
    &.filled:hover {
      color: #fff;
      background: var(--accent-color);
    }
    &.red {
      border: 2px solid #c91f1f;
      color: #ac0000;
    }
    &.red:hover {
      background: #ac000026;
    }
    &.red.filled:hover {
      color: #fff;
      background: #ac0000;
    }
  }
  &.inactive {
    color: #ccc !important;
    background: #f1f1f1 !important;
    border: 2px solid #ccc !important;
    pointer-events: none; 
  }
`;
