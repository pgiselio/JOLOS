import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--primary-bg);
  border-radius: 5px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
  margin-top: 20px;
  overflow: hidden;
`;

export const BoxTitle = styled.div`
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

  & ~ div {
    padding-top: 15px;
  }
  h1,
  h2,
  h3 {
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

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  text-align: justify;
`;

export const BoxMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 40px 10px;
  background: var(--secondary-bg);
  align-items: center;
  color: var(--text-b);
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  &::before {
    content: "\f05a";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;

    color: var(--info-msg-icon);
    height: 100%;
    font-size: 35px;
  }
`;
