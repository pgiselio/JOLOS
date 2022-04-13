import styled from "styled-components";

export const LoadingPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--top-bar-height));
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #fff;
`;

export const LoadingPageLogoStyle = styled(LoadingPageStyle)`
  background: var(--accent-color);
  img {
    width: 140px;
    height: 140px;
  }
`;
