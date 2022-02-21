import styled from "styled-components";

export const HeaderSysStyle = styled.header`
  .header {
    display: flex;
    position: fixed;
    width: 100%;
    z-index: 5;
    max-width: 100vw;
    height: var(--top-bar-height);
  }

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

    #btn-collapse-sidemenu::before {
      content: "\f060";
      display: none;
    }

    .three-bars-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lines-btn span {
      display: flex;
      width: 18px;
      height: 2px;
      margin-bottom: 5px;
      position: relative;
      background: #000;
      border-radius: 3px;
      transition: width 0.2s ease;
    }
    #btn-collapse-sidemenu:hover .lines-btn span {
      width: 14px;
    }
    #btn-collapse-sidemenu:active .lines-btn span {
      width: 8px;
    }

    .lines-btn span:nth-last-child(1) {
      margin-bottom: 0;
    }

    body.toggle-sidemenu #btn-collapse-sidemenu .lines-btn span {
      width: 6px;
    }
    body.toggle-sidemenu #btn-collapse-sidemenu:hover .lines-btn span {
      width: 12px;
    }
    body.toggle-sidemenu #btn-collapse-sidemenu:active .lines-btn span {
      width: 16px;
    }

    .botao-ham {
      display: none;
    }
  }
`;
