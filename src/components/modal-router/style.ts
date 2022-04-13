import Dialog from "@reach/dialog";
import styled from "styled-components";

export const ModalRouterStyle = styled(Dialog)`
  min-width: 600px;
  width: 50vw;
  margin: 5vh auto;
  background: var(--secondary-bg);
  outline: none;
  border-radius: 5px;
  .close-button {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  .close-button i{
    font-size: 17px;
    color: var(--text-a);
  }
  .close-button:hover i {
    color: red;
  }
  @media (max-width: 700px) {
    margin: 0;
    min-width: initial;
    position: relative;
    width: 100vw;
    height: 100vh;
  }
`;
