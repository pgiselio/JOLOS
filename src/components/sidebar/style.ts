import styled from "styled-components";

export const SidebarAside = styled.aside`
  //Sidebar List
  grid-area: menu;
  height: calc(100vh - var(--top-bar-height));
  background-color: var(--navs-bg);
  border-right: 1px solid ${props => props.theme.colors.systemMenu.border};
  position: fixed;
  overflow: overlay;
  overflow-x: hidden;
  top: var(--top-bar-height);
  z-index: 20;
  width: 280px;
  transition: width 0.3s, transform 0.5s, padding 0.3s linear;
  transform: translateX(-101vw);

  body.toggle-sidemenu & {
    padding: 0;
    padding-right: 10px;
    transform: translateX(0);
  }

  .side-bar-container {
    padding-top: 30px;
  }

  .perfil {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .profile-pic {
    width: 65px;
    height: 65px;
    border-radius: 100%;
    transition: height 0.3s, width 0.3s ease;
  }

  .name-perfil,
  .perfil .detail {
    color: var(--text-a);
    width: 100%;
    text-align: center;
    overflow: hidden;
    overflow-wrap: anywhere;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-transform: capitalize;
    padding: 0 10px;
    padding-top: 10px;
    font-size: 15px;
    font-weight: 500;
    opacity: 1;
    transition: height 0.5s, opacity 0.5s, padding 0.5s ease;
  }
  .perfil .detail {
    color: var(--text-b);
    font-size: 13px;
    text-transform: none;
    padding: 0;
  }

  .data {
    margin-top: 30px;
  }

  .data-items {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }

  @media (min-width: 766px) {
    padding-right: 10px;
    position: sticky;
    transition: padding 0.3s ease;
    border-right: none;
    transform: initial;
    &::-webkit-scrollbar {
      width: 8px;
      transition: all 0.3s linear;
    }

    &::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 20px;
      background-clip: content-box;
      border: 2px solid transparent;
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: #a3a3a3d5;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #838383d5;
      border-width: 1px;
    }
    &::-webkit-scrollbar-thumb:active {
      background-color: #707070d5;
      border-width: 1px;
    }
    body.toggle-sidemenu & {
      width: 80px;
      padding: 0 10px;
    }

    body.toggle-sidemenu & .profile-pic {
      width: 60px;
      height: 60px;
    }

    body.toggle-sidemenu & .name-perfil,
    body.toggle-sidemenu & .perfil .detail {
      opacity: 0;
      height: 0;
      padding: 0;
    }
  }

  // ------- Sidebar Item --------
  .data-items li {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;

    a {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      height: 42px;
      text-decoration: none;
      font-weight: 500;
      color: var(--text-a);
      padding: 10px 15px;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
      transition: border-radius 0.5s, margin 0.5s ease;
    }
    a span {
      opacity: 1;
      margin-left: 15px;
      width: calc(100% - 45px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: opacity 0.5s ease;
    }
    a i {
      width: 30px;
      color: var(--text-b);
      text-align: center;
    }
    a:hover {
      background-color: /*#dfdfdf*/ var(--secondary-bg);
    }

    a:active {
      background-color: /*#cecece*/ var(--primary-bg);
    }

    a.active {
      background-color: var(--accent-color);
      color: #fff;
      margin-right: 0;
    }

    a.active i {
      color: #fff;
    }

    a.sair:hover i {
      color: #b3001e !important;
    }

    @media (min-width: 766px) {
      body.toggle-sidemenu & a {
        padding: 15px 15px;
        border-radius: 30px;
      }

      body.toggle-sidemenu & a span {
        opacity: 0;
        display: none;
      }

      body.toggle-sidemenu & a i {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }
  }
`;
