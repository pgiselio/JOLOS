import styled from "styled-components";

export const LandingStyle = styled.div`
  main.landing-main {
    margin-top: 80px;
  }

  main.landing-main section {
    height: 50vh;
    background: #f1f1f1;
    margin-top: 10px;
  }

  footer.landing-footer {
    margin-top: 100px;
    height: 500px;
    display: flex;
    background: #810016;
  }
  .navigate-container {
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    margin-bottom: 200px;
  }
  .logo-nav {
    display: flex;
    align-items: center;
    margin-left: 12px;
    z-index: 2;
  }
  .logo-nav:hover {
    filter: grayscale(0.5);
  }
  .logo-nav img {
    height: 40px;
  }
  .navigate {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    background: #fff;
    border-bottom: 1px solid #cccc;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  }

  .menu-container {
    display: flex;
    width: 95vw;
    justify-content: space-between;
  }

  .menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    background: #ffffff;
    box-shadow: 5px 5px 6px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 30px;
    top: 78px;
    left: 0;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    transform: translateY(-150vh);
    pointer-events: none;
    user-select: none;
    max-height: calc(100vh - 80px);
    overflow: hidden;
    overflow-y: auto;
  }
  .menu.active {
    transform: none;
    pointer-events: initial;
  }

  .menu li {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
  }

  .menu li a {
    text-align: center;
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    color: var(--accent-color);
  }

  .menu li a:hover {
    background: var(--accent-color);
    color: #fff;
    border-color: var(--accent-color);
  }
  .acesso {
    display: none;
  }
  .acesso-mobile {
    display: flex;
    flex-direction: column;
    position: absolute;
    justify-content: center;
    background: #ffffff;
    box-shadow: 5px 5px 6px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 30px;
    top: 78px;
    left: 0;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    transform: translateY(-150vh);
    pointer-events: none;
    user-select: none;
    max-height: calc(100vh - 80px);
    overflow: hidden;
    overflow-y: auto;
  }
  .acesso-mobile a {
    text-align: center;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    color: var(--accent-color);
    margin-left: initial;
    margin-bottom: 10px;
  }
  .acesso-mobile.active {
    transform: none;
    pointer-events: initial;
  }

  .mobile-buttons {
    display: flex;
    align-items: center;
    column-gap: 10px;
    z-index: 1;
  }
  .access-bt {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    z-index: 1;
    background: #959595;
    border: none;
    border-radius: 50%;
    transition: background .3s linear;
  }
  .access-bt::before {
    content: "\f007";
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    width: 13px;
    height: 13px;
    padding: 5px;
    border: 2px solid #000;
    border-radius: 30px;
    color: #000;
    color: #fff;
    border-color: #fff;
    transition: all .3s linear;
  }
  .access-bt.active{
    background-color: var(--accent-color);
  }
  .access-bt.active::before {
    color: #fff;
    border-color: #fff;
  }

  .login-bt,
  .signup-bt {
    text-decoration: none;
    color: var(--accent-color);
    font-size: 15px;
    padding: 8px 20px;
    font-weight: 500;
    transition: 0.1s linear;
  }

  .login-bt:hover {
    color: var(--accent-color-active);
  }

  .signup-bt {
    border: 2px solid var(--accent-color);
    border-radius: 6px;
    margin-left: 15px;
  }

  .signup-bt:hover {
    color: #fff;
    background: var(--accent-color);
  }

  @media (min-width: 766px) {
    .logo-index {
      margin-left: initial;
    }
    .mobile-buttons {
      display: none;
    }
    .menu-container {
      height: 100%;
    }
    .menu {
      transform: none;
      padding-top: 30px;
      flex-direction: row;
      position: relative;
      background: initial;
      box-shadow: none;
      width: initial;
      padding: initial;
      top: initial;
      left: initial;
      pointer-events: initial;
      height: 100%;
    }

    .menu,
    .acesso {
      display: flex;
      align-items: center;
    }

    .menu li {
      display: flex;
      padding: 0 5px;
      position: relative;
      margin-top: initial;
      height: 100%;
    }

    .menu li a {
      text-decoration: none;
      color: #202020;
      font-weight: 500;
      height: 100%;
      width: initial;
      text-align: center;
      border: none;
      font-size: initial;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .menu li a:hover {
      color: var(--accent-color);
      background: initial;
    }

    .menu li a::after {
      content: " ";
      width: 0;
      height: 4px;
      border-radius: 10px;
      display: block;
      position: absolute;
      bottom: 0;
      background: var(--accent-color);
      transition: 0.13s linear;
    }

    .menu li a:hover::after {
      width: calc(100% - 20px);
    }
  }
`;
