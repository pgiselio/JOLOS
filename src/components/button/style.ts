import styled from "styled-components";

export const StyledButton = styled.button`
  /* Buttons */
  .btn-accent {
    border-radius: 30px;
    background: var(--accent-color);
    padding: 10px;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: 0.1s linear;
  }

  .btn-accent.less-radius {
    border-radius: 8px;
  }

  .btn-accent:hover {
    background: var(--accent-color-active);
  }

  .btn-outlined {
    text-decoration: none;
    color: var(--accent-color);
    font-size: 15px;
    padding: 8px 20px;
    font-weight: 500;
    border: 2px solid var(--accent-color);
    border-radius: 50px;
    cursor: pointer;
    background: transparent;
    transition: 0.1s linear;
  }

  .btn-outlined:hover {
    background: var(--accent-color-opacity);
  }
  .btn-outlined.filled:hover {
    color: #fff;
    background: var(--accent-color);
  }

  .btn-outlined.red {
    border: 2px solid #c91f1f;
    color: #ac0000;
  }

  .btn-outlined.red:hover {
    background: #ac000026;
  }
  .btn-outlined.red-filled:hover {
    color: #fff;
    background: #ac0000;
  }
  .btn-outlined.less-radius {
    border-radius: 8px;
  }
`;
