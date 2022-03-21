import styled from "styled-components";

export const Button = styled.button`
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
  &.red {
    background: #c91f1f;
    border: 2px solid #c91f1f;
  }
  &.red:not(:disabled):hover {
    background: #ac0000;
    border: 2px solid #ac0000;
  }
  &.less-radius {
    border-radius: 6px;
  }
  &.outlined {
    color: var(--accent-color);
    border: 2px solid var(--accent-color);
    background: transparent;
    &:not(:disabled):hover {
      background: var(--accent-color-opacity);
      border: 2px solid var(--accent-color);
    }
    &.filled:not(:disabled):hover {
      color: #fff;
      background: var(--accent-color);
      border: 2px solid var(--accent-color);
    }
    &.red {
      border: 2px solid #c91f1f;
      color: #ac0000;
    }
    &.red:not(:disabled):hover {
      background: #ac000026;
      border: 2px solid #c91f1f;
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