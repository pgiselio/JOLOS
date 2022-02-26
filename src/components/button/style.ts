import styled from "styled-components";

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
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
  :not(:disabled):hover {
    background: var(--accent-color-active);
    border: 2px solid var(--accent-color-active);
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
    &.filled:not(:disabled):hover {
      color: #fff;
      background: var(--accent-color);
    }
    &.red {
      border: 2px solid #c91f1f;
      color: #ac0000;
    }
    &.red:not(:disabled):hover {
      background: #ac000026;
    }
    &.red.filled:not(:disabled):hover {
      color: #fff;
      background: #ac0000;
    }
  }
  &:disabled {
    opacity: .4;
    cursor: not-allowed;
  }
`;
