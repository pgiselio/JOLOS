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
  .inputs{
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .pwrst-link {
    width: 100%;
    font-weight: 500;
    color: var(--accent-color);
    text-decoration: none;
    font-size: 10pt;
  }
  .pwrst-link:hover {
    text-decoration: underline;
  }
  .logo-login {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .logo-login .logo{
    width: 110px;
  }
  .registre-se{
    display: flex;
    font-size: 13px;
    align-items: center;
    justify-content: center;
    width: 100%;
    column-gap: 5px;
  }
  .bt-cadse {
    display: flex;
    color: var(--accent-color);
    font-weight: 600;
    border: none;
  }
  .bt-cadse:hover {
    color: var(--accent-color-active);
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
    column-gap: 10px;
  }
  .desc {
    margin-top: 0;
    margin-bottom: 10px;
    color: #052a0c;
    font-weight: 600;
    font-size: 22px;
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
    font-weight: 500;
  }
  .group5 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }


  .iconed-input{
    display: flex;
    position: relative;
    width: 100%;
  }
  .iconed-input input{
    display: flex;
    padding-left: 40px;
    width: 100%;
  }
  .iconed-input i{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #686868;
    pointer-events: none;
  }
  .iconed-input input:focus ~ i{
    color: var(--accent-color);
  }
  .iconed-input #showPassword{
    all: unset;
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    width: 40px;
    justify-content: center;
    height: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .iconed-input #showPassword::after{
    all: unset;
    content: "\f06e";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 13px;
    position: relative;
    color: var(--accent-color);
    height: 14px;
    transition: color .2s ease;
  }
  .iconed-input #showPassword:checked::after{
    content: "\f070";
    color: var(--accent-color-active);
  }

  @media (min-width: 766px) {
    .login-form {
      padding: 50px;
    }
    .group2 {
      display: flex;
      flex-direction: row;
    }
    .signup-form {
      max-width: 750px;
      padding-bottom: 30px;
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