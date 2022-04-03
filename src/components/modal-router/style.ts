import Dialog from "@reach/dialog";
import styled from "styled-components";

export const ModalRouterStyle = styled(Dialog)`
  min-width: 600px;
  width: 50vw;
  margin: 5vh auto;
  background: var(--secondary-bg);
  outline: none;
  border-radius: 5px;

  @media (max-width: 700px) {
    margin: 0;
    min-width: initial;
    position: relative;
    width: 100vw;
    height: 100vh;
  }
`;
