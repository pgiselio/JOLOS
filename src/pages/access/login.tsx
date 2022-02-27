import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import "./access.scss";
import { StyledAccess } from "./style";
export function LoginPage() {
    document.body.style.background = "linear-gradient(45deg, rgba(6,52,15,1) 0%, rgba(28,136,50,1) 50%, rgba(147,255,169,1) 100%), rgb(6,52,15)";
    document.body.style.backgroundAttachment = "fixed";

    const onSubmit = (event : FormEvent) => {
        let user: any = document.querySelector('#login');
        let pass: any = document.querySelector('#pass');
        var msg: any = document.querySelector('.info-message')
    
    
        if (user.value === "admin" && pass.value === "ADMIN") {
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
                        <div className="logo-login">
                            <a href="../"><img src="../images/logo.svg" className="logo" alt="Logo do IF Jobs"
                            title="Logo IF Jobs" /></a>
                        </div>
                        <form method="post" autoComplete="off" onSubmit={onSubmit}>
                            <h2 className="desc">Entrar</h2>
                            <div className="info-message error-msg">
                                <span>Usuário ou senha inválidos</span>
                            </div>
                            <div className="inputs">
                                <Input type="text" icon="fas fa-user" id="login" placeholder="Usuário" spellCheck={false} />
                                <Input type="password" icon="fas fa-lock" name="" id="pass" placeholder="Senha" /> 
                            </div>
                            <a href="/password-reset/" className="pwrst-link">Esqueceu a senha?</a>
                            <Button type="submit" className="less-radius">Entrar</Button>
                            <div className="registre-se">
                                <span>Não tem uma conta?</span> 
                                <Link to="/cadastro" className="bt-cadse">Registre-se</Link>
                            </div>  
                        </form>
                    </div>
                </div>
            </StyledAccess>

            <script src="/js/checkedValidationButton.js"></script>
        </div>
    );
}



