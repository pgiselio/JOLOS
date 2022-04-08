import styled from "styled-components";

export const SettingPageStyle = styled.section`
  display: grid;
  grid-template-areas: "navsettings content";
  grid-template-columns: auto 1fr;
  .nav-settings-container {
    display: flex;
    flex-direction: column;
    max-width: 260px;
    width: 100vw;
    border-right: 1px solid var(--outline-color);
    height: calc(100vh - var(--top-bar-height));
    position: sticky;
    top: var(--top-bar-height);
    background: var(--bg-body);
    grid-area: navsettings;
    .items {
      display: flex;
      flex-direction: column;
      position: sticky;
      margin: 0 10px;
      top: var(--top-bar-height);
      gap: 10px;
      h3 {
        padding: 30px 5px;
        padding-left: 20px;
      }
      button {
        padding: 5px 10px;
        padding-left: 15px;
        border-radius: 5px;
      }
      button:hover {
        background: var(--accent-color-opacity);
        border-right-color: transparent;
      }
      button::after {
        left: -1px;
        bottom: initial;
        height: 70%;
        border-radius: inherit;
      }
    }
  }
  .content-settings {
    width: 100%;
    padding: 30px;
  }
  @media (max-width: 999px) {
    display: flex;
    .nav-settings-container {
      position: relative;
      border: none;
      max-width: initial;
      width: 95%;
      top: 0;
      .items {
        position: relative;
        top: 0;
        button {
          padding: 15px;
        }
      }
    }
    .content-settings {
      position: absolute;
    }
    .content-settings .setting {
      z-index: 3;
      background: var(--bg-body);
    }
  }
`;
