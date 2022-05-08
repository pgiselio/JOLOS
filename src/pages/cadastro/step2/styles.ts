import styled from "styled-components";

export const CadastroStep2Style = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    animation: slide-left 0.5s ease;
    h1 {
      font-size: 90px;
      line-height: 90px;
      color: var(--accent-color);
    }
    .message {
      max-width: 300px;
      color: var(--text-b);
      text-align: center;
      font-size: 14px;
    }
    .code-fields {
      display: flex;
      flex-direction: row;
      gap: 6px;
      margin-top: 20px;
      .code-field {
        max-width: 30px;
        font-size: 20px;
        font-weight: 500;
        padding: 5px;
        text-align: center;
      }
    }
  }
`;
