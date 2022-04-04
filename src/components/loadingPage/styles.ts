import styled from "styled-components";

export const LoadingPageStyle = styled.div`
  display: flex;
  height: calc(100vh - var(--top-bar-height));
  align-items: center;
  justify-content: center;
`;

export const LoadingPageLogoStyle = styled(LoadingPageStyle)`
  background: var(--accent-color);
  img {
    width: 140px;
    height: 140px;
  }
`;
