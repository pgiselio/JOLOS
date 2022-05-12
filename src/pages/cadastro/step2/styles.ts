import styled from "styled-components";
import { InputStyle } from "../../../components/input/styles";

export const CadastroStep2Style = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
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
      justify-content: center;
      gap: 6px;
      margin-top: 20px;
      .code-field{
        width: initial;
      }
      .styles_react-code-input__CRulA{
        display: flex;
        gap: 5px;
      }
      .styles_react-code-input__CRulA > input{
        ${InputStyle}
        caret-color: var(--accent-color);
        max-width: 35px;
        font-size: 20px;
        font-weight: 500;
        padding: 5px;
        text-align: center;
      }
    }
  }
`;
