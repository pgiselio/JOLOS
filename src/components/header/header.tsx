import "./header.css";
function Collapse() {
  document.body.classList.toggle('toggle-sidemenu');
  storageSidebarState();
}

function storageSidebarState() {
  if (document.body.classList.contains('toggle-sidemenu')) {
    localStorage.setItem('sidebar-collapsed', 'collapsed');
  } else {
    localStorage.setItem('sidebar-collapsed', '');
  }
}
export function Header() {
  return (
    <header className="header">
      <nav className="navigate">
        <div className="menu-container">
          <button id="btn-collapse-sidemenu" onClick={Collapse} aria-label="Botão de esconder ou mostrar menu lateral">
            <div className="three-bars-btn">
              <div className="lines-btn">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="botao-ham">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <img src="../images/logo.svg" className="logo" alt="logo projeto" />
          <button className="btn-notify" aria-label="Botão de notificações">
            <i className="fas fa-bell"></i>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}