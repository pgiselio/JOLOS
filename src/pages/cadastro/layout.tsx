import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";

export function CadastroLayout() {
  let location = useLocation();
  let navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    if (auth.email) {
      navigate("/sys");
    }
  });
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
                <span
                  {...(location.pathname === "/cadastro"
                    ? { className: "active" }
                    : (location.pathname === "/cadastro/step2" ||
                        location.pathname === "/cadastro/step3") && {
                        className: "done",
                      })}
                  title="Cadastro básico"
                ></span>
                <span
                  {...(location.pathname === "/cadastro/step2"
                    ? { className: "active" }
                    : location.pathname === "/cadastro/step3" && {
                        className: "done",
                      })}
                  title="Confirmação do e-mail"
                ></span>
                <span
                  {...(location.pathname === "/cadastro/step3" && {
                    className: "active",
                  })}
                  title="Cadastramento de dados"
                ></span>
            </div>
          </div>
          <div className="cadastro-content">
            <Outlet />
          </div>
        </div>
      </section>
    </StyledAccess>
  );
}
