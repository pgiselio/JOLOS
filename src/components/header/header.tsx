import { HeaderSysStyle } from "./style";

export function Header() {
  function Collapse() {
    const botaoHam = document.querySelector(".botao-ham");
    document.body.classList.toggle("toggle-sidemenu");
    botaoHam?.classList.toggle("active");
    storageSidebarState();
  }

  function storageSidebarState() {
    if (document.body.classList.contains("toggle-sidemenu")) {
      localStorage.setItem("sidebar-collapsed", "yes");
    } else {
      localStorage.setItem("sidebar-collapsed", "");
    }
  }

  return (
    <HeaderSysStyle className="header">
      <nav className="navigate">
        <div className="menu-container">
          <button
            id="btn-collapse-sidemenu"
            onClick={Collapse}
            aria-label="Botão de esconder ou mostrar menu lateral"
          >
            <div className="botao-ham">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <img src="/images/logo.svg" className="logo" alt="logo projeto" />
          <button className="btn-notify" aria-label="Botão de notificações">
            <i className="fas fa-bell"></i>
            <span></span>
          </button>
        </div>
      </nav>
    </HeaderSysStyle>
  );
}
