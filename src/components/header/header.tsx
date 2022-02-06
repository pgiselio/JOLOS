export function Header() {
    return(
        <header className="header">
          <nav className="navigate">
            <div className="menu-container">
              <button id="btn-collapse-sidemenu">
                <div className="three-bars-btn">
                  <div className="dots-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
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
              <button className="btn-notify">
                <i className="fas fa-bell"></i>
                <span></span>
              </button>
            </div>
          </nav>
        </header>
    );
}