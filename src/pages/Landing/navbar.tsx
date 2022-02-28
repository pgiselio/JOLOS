import { useState } from "react";

export function LandNavBar() {
  const [menuState, setMenuState] = useState(false);
  const [accessState, setAccessState] = useState(false);
  return (
    <header className="landing navigate-container">
      <nav className="navigate">
        <div className="menu-container">
          <a href="/" className="logo-nav">
            <img src="images/logo.svg" alt="" />
          </a>
          <ul className={menuState ? "menu active" : "menu"}>
            <LandBarItem href="#1" label="Tadah" setMenuState={setMenuState} />
            <LandBarItem href="#2" label="Cursos" setMenuState={setMenuState} />
            <LandBarItem href="#3" label="Sobre" setMenuState={setMenuState} />
            <LandBarItem href="#4" label="Contato" setMenuState={setMenuState} />
          </ul>
          <div className="acesso">
            <Acesso />
          </div>
          <div className="mobile-buttons">
            <button
              type="button"
              className={accessState ? "access-bt active" : "access-bt"}
              onClick={() => {
                setMenuState(false);  
                setAccessState(!accessState);
              }}
            ></button>
            <div className={accessState ? "acesso-mobile active" : "acesso-mobile"}>
              <Acesso />
            </div>
            <div
              id="botao-ham"
              className={menuState ? "botao-ham active" : "botao-ham"}
              onClick={() => {
                setMenuState(!menuState);
                setAccessState(false);
              }}
            >
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
function LandBarItem({ href, label, setMenuState }: any) {
  const hideMenu = () => {
    setMenuState(false);
  };
  return (
    <li>
      <a href={href} onClick={hideMenu}>
        {label}
      </a>
    </li>
  );
}

function Acesso() {
  return (
    <>
      <a href="entrar" className="login-bt">
        Login
      </a>
      <a href="cadastro" className="signup-bt">
        Cadastro
      </a>
    </>
  );
}
