import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-body: rgb(${props => props.theme.colors.bodyBackground});
    --accent-color: rgb(${props => props.theme.colors.main});
    --accent-color-active: ${props => props.theme.colors.mainActive};
    --accent-color-opacity: rgb(${props => props.theme.colors.main} / 15%);
    --outline-color: ${props => props.theme.colors.outlineColor};
    --info-msg-bg: #e6e6e69a;
    --info-msg-color: #363636;
    --info-msg-icon: #72727294;
    --text-a: ${props => props.theme.colors.textA};
    --text-b: ${props => props.theme.colors.textB};
    --text-c: ${props => props.theme.colors.textC};
    --navs-bg: rgb(${props => props.theme.colors.systemMenu.background});
    --navs-bg-opacity: rgb(${props => props.theme.colors.systemMenu.background} / 96%);
    --primary-bg: ${props => props.theme.colors.primaryBg};
    --secondary-bg: ${props => props.theme.colors.secondaryBg};
  }
  body {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
    color: var(--text-a);
    font-family: "Poppins", Arial, sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root{
    height: 100%;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

`;
