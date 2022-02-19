import styled from "styled-components";

export const StyledAccess = styled.main`
    :root {
    --bg-body: linear-gradient(
        45deg,
        rgba(6, 52, 15, 1) 0%,
        rgba(28, 136, 50, 1) 50%,
        rgba(147, 255, 169, 1) 100%
      ),
      rgb(6, 52, 15);
    --bg-login: #fcfcfc;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    width: 95vw;
    max-width: 400px;
    border-radius: 15px;
    background: var(--bg-login);
    border: 1px solid var(--outline-color);
    box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2);
  }
  .signup-form {
    align-items: initial;
  }
  .group3,
  .login-form form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .group3 > *,
  .login-form form > * {
    margin-top: 16px;
  }
  .pwrst-link {
    width: 100%;
    text-align: center;
    color: var(--accent-color);
    text-decoration: none;
    font-size: 10pt;
  }
  .pwrst-link:hover {
    text-decoration: underline;
  }
  .bt-cadse {
    display: flex;
    background: transparent;
    padding: 10px;
    color: var(--outline-color);
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }
  .bt-cadse:hover {
    color: #fff;
  }
  .logo-login {
    display: flex;
    padding: 25px 60px;
    margin-bottom: 20px;
    width: 330px;
  }
  .header-signup {
    display: flex;
    justify-content: space-between;
  }
  .logo-signup {
    width: 100%;
    max-width: 100px;
  }
  .progress {
    display: flex;
    align-items: center;
  }
  .progress > span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    background: var(--outline-color);
    margin-right: 12px;
  }
  .progress > span:last-child {
    margin-right: 0;
  }
  .progress > span.active {
    background: var(--accent-color);
    width: 20px;
  }
  .progress > span.done {
    background: var(--accent-color);
  }
  .input-group {
    display: flex;
    justify-content: space-between;
  }
  .input-group > * {
    display: flex;
    width: 100%;
  }
  .input-group :nth-child(1) {
    margin-right: 8px;
  }
  .desc {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .imagem-destaque {
    display: none;
  }
  .flex-btn-next {
    display: flex;
  }
  .btn-next {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: 100ms linear;
    user-select: none;
    color: var(--accent-color);
  }
  .btn-next::after {
    content: "\f061";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;

    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    margin-left: 5px;
    background: var(--accent-color);
    transition: 100ms linear;
  }
  .btn-next:hover {
    color: var(--accent-color-active);
  }
  .btn-next:hover::after {
    background: var(--accent-color-active);
  }
  .btn-next:active {
    color: var(--accent-color-active);
  }
  .btn-next:active::after {
    transform: translateX(3px);
    background: var(--accent-color-active);
  }
  .flex-btn-login {
    display: flex;
  }
  .btn-login {
    padding: 10px;
    color: var(--accent-color);
    font-size: 14px;
    text-decoration: none;
  }
  .group5 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  @media (min-width: 766px) {
    .login-form {
      padding: 50px;
      padding-bottom: 30px;
    }
    .group2 {
      display: flex;
      flex-direction: row;
    }
    .signup-form {
      max-width: 750px;
    }
    .signup-form form {
      flex-grow: 3;
    }
    .logo-signup {
      max-width: 150px;
      height: 40px;
    }
    .imagem-destaque,
    .group4 {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    .group4 {
      max-width: 280px;
    }
    .imagem-destaque img {
      width: 80%;
    }
  }
`;