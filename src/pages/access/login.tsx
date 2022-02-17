import { FormEvent } from "react";
import "./login.scss";
import { StyledAccess } from "./style";
export function LoginPage() {
    document.body.style.background = "linear-gradient(45deg, rgba(6,52,15,1) 0%, rgba(28,136,50,1) 50%, rgba(147,255,169,1) 100%), rgb(6,52,15)";
    document.body.style.backgroundAttachment = "fixed";

    const onSubmit = (event : FormEvent) => {
        let user: any = document.querySelector('#login');
        let pass: any = document.querySelector('#pass');
        var msg: any = document.querySelector('.info-message')
    
    
        if (user.value == "admin" && pass.value == "ADMIN") {
            // window.sessionStorage.setItem('isloggedin', 'true');
            window.location.href = "sys";
        } else {
            msg.classList.add('show');
        }

        event.preventDefault();
    };
    
    return (
        <div id="login-page">
            <StyledAccess>
                <div className="container">
                    <div className="login-form">
                        <a href="../"><img src="../images/logo.svg" className="logo-login" alt="Logo do IF Jobs"
                            title="Logo IF Jobs" /></a>
                        <form method="post" autoComplete="off" onSubmit={onSubmit}>
                            <div className="info-message error-msg">
                                <span>Usuário ou senha inválidos</span>
                            </div>
                            <div className="lbl-icon">
                                <label htmlFor="login">
                                    <i className="fas fa-user"></i>
                                </label>
                                <input type="text" id="login" placeholder="Usuário" spellCheck="false" />
                            </div>
                            <div className="lbl-icon">
                                <label htmlFor="pass">
                                    <i className="fas fa-lock"></i>
                                </label>
                                <input type="password" name="" id="pass" placeholder="Senha" />
                            </div>
                            <div className="chk">
                                <input type="checkbox" name="checkbox" id="checkbox" className="checkbox" />
                                <label htmlFor="checkbox">Mostrar senha</label>
                            </div>
                            <input type="submit" className="btn-accent" value="Entrar" />
                            <a href="/password-reset/" className="pwrst-link">Esqueceu a senha?</a>
                        </form>
                    </div>
                    <div>
                        <a href="cadastro" className="bt-cadse">Cadastre-se</a>
                    </div>
                </div>
            </StyledAccess>

            <script src="/js/checkedValidationButton.js"></script>
        </div>
    );
}



