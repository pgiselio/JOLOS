import styled from "styled-components";

export const PillList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;
export const PillItem = styled.li`
  margin-top: 10px;
  max-width: 100%;

  .vaga-page-info-item {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    margin-right: 10px;
    background: var(--secondary-bg);
    border-radius: 50px;
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
  }

  .vaga-page-info-item i {
    width: 20px;
    line-height: 25px;
    text-align: center;
    margin-right: 5px;
    color: var(--text-b);
  }

  .vaga-page-info-item span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
