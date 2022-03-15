import styled from "styled-components";

export const BoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--secondary-bg);
  border-radius: 5px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
  margin-top: 20px;
  overflow: hidden;
`;

export const BoxTitleStyle = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: var(--primary-bg);
  border-bottom: 1px solid var(--outline-color);
  position: relative;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  column-gap: 5px;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-c);
  align-items: center;

  & ~ div{
      padding-top: 15px;
  }
  h1, h2, h3{
    font-size: 16px;
    font-weight: 500;
  }

  .box-title.check {
    padding: 15px;
  }

  .box-title.sticky {
    position: sticky;
    top: 90px;
    z-index: 3;
  }
`;

export const BoxContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  text-align: justify;
`;
