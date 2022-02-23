import styled from "styled-components";

export const SidebarAside = styled.aside`
  //Sidebar List
  grid-area: menu;
  height: calc(100vh - var(--top-bar-height));
  background-color: white;
  border-right: 1px solid rgb(228, 228, 228);
  position: fixed;
  overflow: auto;
  overflow-x: hidden;
  top: var(--top-bar-height);
  z-index: 20;
  width: 0;
  transition: width 0.3s, padding 0.3s ease;

  body.toggle-sidemenu & {
    width: 280px;
    padding: 0;
    padding-right: 10px;
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

  .name-perfil , .perfil .detail{
    color: #000;
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
  .perfil .detail{
    color: #666;
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
    width: 280px;
    padding-right: 10px;
    position: sticky;
    transition: padding 0.3s ease;
    border-right: none;

    body.toggle-sidemenu & {
      width: 80px;
      padding: 0 10px;
    }

    body.toggle-sidemenu & .profile-pic {
      width: 60px;
      height: 60px;
    }

    body.toggle-sidemenu & .name-perfil, body.toggle-sidemenu & .perfil .detail {
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
      color: rgb(43, 43, 43);
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
      color: rgb(85, 85, 85);
      text-align: center;
    }
    a:hover {
      background-color: #dfdfdf;
    }

    a:active {
      background-color: #cecece;
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
