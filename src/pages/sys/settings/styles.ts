import styled from "styled-components";

export const SettingPageStyle = styled.section`
  display: grid;
  grid-template-areas: "navsettings content";
  grid-template-columns: auto 1fr;
  .rounded-corner {
    z-index: 5;
    ::after {
      display: none;
    }
  }
  .header {
    display: flex;
    width: 100%;
    background: var(--bg-body);
    position: sticky;
    top: var(--top-bar-height);
    align-items: center;
    padding: 30px;
    z-index: 15;
    .header-items {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .header-items.slide-left {
      animation: slide-left 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .back-button {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 30px;
      position: relative;
      width: 35px;
      height: 35px;
      background: transparent;
      border: none;

      i {
        color: var(--text-b);
      }
      :hover {
        border: 1px solid var(--outline-color);
        i {
          color: var(--text-a);
        }
      }
    }
  }
  .nav-settings-container {
    display: flex;
    flex-direction: column;
    max-width: 260px;
    width: 100vw;
    border-right: 1px solid var(--outline-color);
    min-height: calc(100vh - var(--top-bar-height));
    position: sticky;
    top: var(--top-bar-height);
    background: var(--bg-body);
    grid-area: navsettings;

    .nav {
      display: flex;
      flex-direction: column;
      position: sticky;
      top: calc(var(--top-bar-height) - 1px);

      .items {
        display: flex;
        flex-direction: column;
        margin: 0 10px;
        gap: 10px;
        z-index: 1;

        button {
          height: fit-content;
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
  }
  .setting-container {
    width: 100%;
    padding-top: 0;
    .setting {
      min-height: 100%;
      .content {
        padding: 0 30px;
        gap: 30px;
        padding-top: 10px;
        animation: slide-left 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        min-height: calc(100vh - var(--top-bar-height));
      }
    }
  }

  @media (max-width: 999px) {
    display: flex;
    .rounded-corner {
      z-index: 15;
      top: var(--top-bar-height);
      position: sticky;
      ::after {
        display: block;
      }
    }
    .header {
      height: 56px;
      padding: 10px;
      top: calc(var(--top-bar-height) - 1px);
      background: var(--navs-bg);
      border-bottom: 1px solid var(--outline-color);
      z-index: 15;
      font-size: 14px;
      h3 {
        padding-left: 10px;
      }
      button ~ h3 {
        padding-left: 0;
      }
    }
    .nav-settings-container {
      position: relative;
      border: none;
      width: 100%;
      max-width: initial;
      top: 0;
      &.toggle {
        display: none;
      }
      .nav {
        z-index: 15;
        .items {
          padding-top: 10px;
          width: 95%;
          position: relative;
          top: 0;
          button {
            padding: 15px;
          }
        }
      }
    }
    .setting-container {
      position: absolute;
      display: none;
    }
    .setting-container.active {
      display: block;
      position: absolute;
      background: var(--bg-body);
      min-height: calc(100vh - var(--top-bar-height));
    }
    .setting-container .setting {
      z-index: 3;
    }
  }
  @media (max-width: 766px) {
    .nav-settings-container{
      .items, .header-items{
        animation: slide-right 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    .rounded-corner {
      ::after {
        display: none;
      }
    }
    .setting-container {
      .setting {
        .content {
          padding: 10px;
        }
      }
    }
  }
`;
