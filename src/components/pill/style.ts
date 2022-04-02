import styled from "styled-components";

export const PillItemStyle = styled.li`
  max-width: 100%;

  .pill-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background: var(--secondary-bg);
    border-radius: 50px;
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
    border: 1px solid rgb(0 0 0 / 3%);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    gap: 5px;
    color: var(--text-a);
  }

  .pill-item i {
    width: 20px;
    line-height: 25px;
    text-align: center;
    color: var(--text-b);
  }

  .pill-item span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
