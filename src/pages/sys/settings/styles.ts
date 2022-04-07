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
      padding-left: 20px;
      top: var(--top-bar-height);
      h3{
          padding: 30px 5px;
      }
      button{
          padding: 10px 10px;
      }
    }
  }
  .content-settings{
      width: 100% ;
      padding: 30px;
  }
`;
