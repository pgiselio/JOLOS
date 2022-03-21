import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";
import "react-toastify/dist/ReactToastify.min.css";
import { CircularProgress } from "react-cssfx-loading/lib";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "jolos@jolos.com",
      password: "jolos",
    },
  });
  let [searchParams, setSearchParams] = useSearchParams();

  const RedirectForSystem = () => {
    navigate("/sys");
  };

  useEffect(() => {
    if (auth.email) {
      RedirectForSystem();
    }
    const paramsError = searchParams.get("error");
    if (paramsError) {
      if (paramsError === "needsLogin") {
        toast.error("Você precisa fazer login primeiro!", {});
        setSearchParams("");
      }
    }
  });

  async function onSubmit(data: any) {
    try {
      setIsLoading(true);
      await auth.signin(data.email, data.password);

      RedirectForSystem();
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Usuário ou senha inválidos!", {});
    }
  }

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

      <div className="access-container">
        <div className="login-form">
          <div className="logo-login">
            <a href="../">
              <img
                src="../images/logo.svg"
                className="logo"
                alt="Logo do IF Jobs"
                title="Logo IF Jobs"
              />
            </a>
          </div>
          <form
            method="post"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="desc">Entrar</h2>
            <div className="info-message error-msg">
              <span>Usuário ou senha inválidos</span>
            </div>
            <div className="inputs">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="email"
                    icon="fas fa-user"
                    placeholder="E-mail"
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Input
                      type="password"
                      id="password"
                      refs="password"
                      icon="fas fa-lock"
                      placeholder="Senha"
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div>
              <Link to="/password-reset/" className="pwrst-link">
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              className="less-radius"
              disabled={!formState.isValid || isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  color="white"
                  height="23px"
                  width="23px"
                  duration="1.5s"
                />
              ) : (
                "Entrar"
              )}
            </Button>
            <div className="registre-se">
              <span>Não tem uma conta?</span>
              <Link to="/cadastro" className="bt-cadse">
                Registre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </StyledAccess>
  );
}
