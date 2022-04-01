import { useState } from "react";
import { CircularProgress } from "react-cssfx-loading/lib";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";

export function CadastroLayout() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <StyledAccess>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AccessGlobalStyle />

      <section className="access-container">
        <div className="login-form signup-form">
          <div className="header-signup">
            <a href="../">
              <img src="../images/logo.svg" alt="" className="logo-signup" />
            </a>
            <div className="progress">
              <span className="active" title="Cadastro básico"></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="cadastro-content">
            <Outlet context={setIsLoading}/>
          </div>
          <div className="bottom-actions">
            <div className="flex-btn-login">
              <Link
                to="/entrar"
                className="btn-login"
                title="Já tem uma conta? Faça Login!"
              >
                Ou... faça login
              </Link>
            </div>
            <div className="flex-btn-next">
              <button
                type="submit"
                className="btn-next"
                title="Confirmar cadastro"
                form="cadastroStep1"
                id="cadastroSubmit"
                disabled={isLoading}
              >
                <span>Próximo</span>
                <span className="next-arrow">
                  {isLoading ? (
                    <CircularProgress
                      color="white"
                      height="2em"
                      width="2em"
                      duration="1.5s"
                      style={{ position: "absolute" }}
                    />
                  ) : (
                    <i className="fas fa-arrow-right"></i>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </StyledAccess>
  );
}
