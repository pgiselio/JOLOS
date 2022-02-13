import "./navbar.scss";

export function LandNavBar() {
    return(
        <header className="landing navigate-container">
                <nav className="navigate">
                    <div className="menu-container">
                        <a href="/" className="logo-nav"><img src="images/logo.svg" alt="" /></a>
                        <ul className="menu">
                            <li><a href="#1">Tadah</a></li>
                            <li><a href="#2">Cursos</a> </li>
                            <li><a href="#3">Sobre</a> </li>
                            <li><a href="#4">Contato</a> </li>
                        </ul>
                        <div className="acesso">
                            <a href="entrar" className="login-bt">Login</a>
                            <a href="cadastro" className="signup-bt">Cadastro</a>
                        </div>
                        <div className="mobile-access">
                            <a href="#" className="access-bt"></a>
                            <div className="acesso-mobile">
                                <a href="entrar" className="login-bt">Login</a>
                                <a href="cadastro" className="signup-bt">Cadastro</a>
                            </div>
                            <div id="botao-ham" className="botao-ham">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
    );
}