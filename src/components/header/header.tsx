import { HeaderSysStyle } from "./style";



export function Header(props : any) {
  
  function ToggleSidebar() {
    const botaoHam = document.querySelector(".botao-ham");
    document.body.classList.toggle("toggle-sidemenu");
    botaoHam?.classList.toggle("active");
    storageSidebarState();
  }

  function storageSidebarState() {
    if (document.body.classList.contains("toggle-sidemenu")) {
      localStorage.setItem("toggle-sidemenu", "yes");
    } else {
      localStorage.setItem("toggle-sidemenu", "");
    }
  }
  const toggleTheme = () => {
    if (props.theme === "light") {
      window.localStorage.setItem("theme", "dark");
      props.setTheme("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      props.setTheme("light");
    }
  }
  
  return (
    <HeaderSysStyle className="header">
      <nav className="navigate">
        <div className="menu-container">
          <button
            id="btn-collapse-sidemenu"
            onClick={ToggleSidebar}
            aria-label="Botão de esconder ou mostrar menu lateral"
          >
            <div className="botao-ham">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <img src="/images/logo.svg" className="logo" alt="logo projeto" />
          <button className="btn-notify" aria-label="Botão de notificações" onClick={toggleTheme}>
            <div style={{display:"none"}}>
              <i className="fas fa-bell"></i>
              <span></span>
            </div>
            {props.theme === "light" ? <i className="far fa-moon"></i> : <i className="far fa-sun"></i>}
            
          </button>
        </div>
      </nav>
    </HeaderSysStyle>
  );
}
