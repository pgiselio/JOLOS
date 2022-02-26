import styled from "styled-components";

export const HeaderSysStyle = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 15;
  max-width: 100vw;
  height: var(--top-bar-height);

  .navigate {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--top-bar-height);
    background: #fff;
    /* box-shadow: 0 1px 10px rgb(0 0 0 / 8%); */
  }

  .menu-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    height: 100%;
  }

  .menu-container .logo {
    height: calc((var(--top-bar-height)) - 20px);
    width: auto;
  }

  .btn-notify {
    background: #f1f1f1;
    border: none;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
  }

  .btn-notify:hover {
    background: #e4e4e4;
  }

  .btn-notify:hover span {
    border-color: #e4e4e4;
  }

  .btn-notify i {
    line-height: 35px;
    font-size: 15px;
    color: #333;
  }

  .btn-notify span {
    background: #d30808;
    border: 2px solid #f1f1f1;
    position: absolute;
    width: 10px;
    height: 10px;
    top: 8px;
    right: 8px;
    border-radius: 50%;
  }

  #btn-collapse-sidemenu {
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 35px;
    height: 35px;
    padding: 5px;
    box-sizing: border-box;
    border: none;
    background: #f1f1f1;
    border-radius: 5px;
  }

  #btn-collapse-sidemenu:hover {
    background: #e4e4e4;
  }

  @media (min-width: 766px) {
    .menu-container {
      width: 100%;
      padding: 0 15px;
      transition: padding 0.2s ease;
    }
    .botao-ham {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: calc(100% + 10px);
    }

    .botao-ham span {
      display: flex;
      width: 18px;
      height: 2px;
      margin-bottom: 5px;
      position: relative;
      background: #000;
      border-radius: 3px;
      transition: width 0.2s ease;
    }
    .botao-ham.active span {
      transform: none ;
      opacity: 1;
      -webkit-transform: none ;
    }
    #btn-collapse-sidemenu:hover .botao-ham span {
      width: 14px;
    }
    #btn-collapse-sidemenu:active .botao-ham span {
      width: 8px;
    }

    .botao-ham span:last-child {
      margin-bottom: 0;
    }

    body.toggle-sidemenu & #btn-collapse-sidemenu .botao-ham span {
      width: 6px;
    }
    body.toggle-sidemenu & #btn-collapse-sidemenu:hover .botao-ham span {
      width: 12px;
    }
    body.toggle-sidemenu & #btn-collapse-sidemenu:active .botao-ham span {
      width: 16px;
    }
  }
`;
