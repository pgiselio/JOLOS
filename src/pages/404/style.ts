import styled from "styled-components";

export const Error404Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 95vh;
  h1 {
    display: flex;
    font-size: 100pt;
    padding: 0;
    margin-block-end: 0;
    margin-block-start: 0;
    line-height: 110px;
    background: linear-gradient(45deg, rgba(6,52,15,1) 0%, rgba(28,136,50,1) 50%, rgba(147,255,169,1) 100%), rgb(6,52,15);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h2 {
    font-weight: 500;
    font-size: 15pt;
    text-transform: uppercase;
  }
`;
