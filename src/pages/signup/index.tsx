import { useState } from "react";
import { useTabs } from "react-headless-tabs";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../../components/input";
import { api } from "../../services/api";
import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { CircularProgress } from "react-cssfx-loading/lib";
import { TabSelector } from "../../components/Tabs/TabSelector";

type signupType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function CadastroPage() {
  const [selectedTab, setSelectedTab] = useTabs(["ALUNO", "EMPRESA"], "ALUNO");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Endereço de e-mail inválido")
      .required("Este campo é obrigatório"),
    password: Yup.string()
      .required("Este campo é obrigatório")
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmPassword: Yup.string()
      .required("Este campo é obrigatório")
      .oneOf([Yup.ref("password")], "As senhas não coincidem"),
  });
  // const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  function onSubmit({ email, password, confirmPassword }: signupType) {
    setIsLoading(true);

    validationSchema
      .isValid({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((valid) => {
        if (valid) {
          formSubmit(email, password);
        }
      });
  }
  async function formSubmit(email: string, password: string) {
    return await api
      .post("/usuario/create", { email, senha: password })
      .catch(function () {
        toast.error(
          "O e-mail informado já se encontra cadastrado no sistema!",
          {}
        );
      })
      .finally(() => setIsLoading(false));
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
          <div className="form-destaque-grid">
            <div className="form">
              <div style={{ display: "flex", justifyContent: "space-between" , flexWrap: "wrap"}}>
                <h2 className="desc">Criar conta</h2>

                <div
                  style={{ display: "flex", height: "35px", columnGap: "10px" }}
                >
                  <TabSelector
                    isActive={selectedTab === "ALUNO"}
                    onClick={() => setSelectedTab("ALUNO")}
                  >
                    Aluno
                  </TabSelector>
                  <TabSelector
                    isActive={selectedTab === "EMPRESA"}
                    onClick={() => setSelectedTab("EMPRESA")}
                  >
                    Empresa
                  </TabSelector>
                </div>
              </div>
              <div
                style={{ display: "flex", flexGrow: 1, alignItems: "center" }}
              >
                <form
                  id="cadastroStep1"
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ paddingRight: "10px" }}
                >
                  <section className="inputs">
                    <div>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            id="email"
                            placeholder="E-mail"
                            {...field}
                            {...errors.email && {className: "danger"}}
                          />
                        )}
                      />
                      <p className="input-error">{errors.email?.message}</p>
                    </div>
                    <div>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="password"
                            id="password"
                            placeholder="Senha"
                            {...field}
                            {...errors.password && {className: "danger"}}
                          />
                        )}
                      />
                      <p className="input-error">{errors.password?.message}</p>
                    </div>
                    <div>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="password"
                            id="passwordconfirm"
                            placeholder="Confirmar senha"
                            {...field}
                            {...errors.confirmPassword && {className: "danger"}}
                          />
                        )}
                      />
                      <p className="input-error">
                        {errors.confirmPassword?.message}
                      </p>
                    </div>
                  </section>
                  <div className="info-message">
                    {selectedTab === "ALUNO" ? (
                      <span>
                        O cadastro continuará após a confirmação do e-mail,
                        então certifique-se de informar um e-mail válido
                      </span>
                    ) : (
                      <span>
                        Entraremos em contato após a confirmação do e-mail
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="destaque">
              {selectedTab === "ALUNO" ? (
                <>
                  <div className="imagem-destaque">
                    <img src="../images/undraw_typewriter_re_u9i2.svg" alt="" />
                  </div>

                  <span>Sua conta a três passos de você</span>
                </>
              ) : (
                <>
                  <div className="imagem-destaque">
                    <img src="../images/undraw_connected_re_lmq2.svg" alt="" style={{width: "60%"}}/>
                  </div>
                  <span>Faça o pré-cadastro da sua empresa</span>
                </>
              )}
            </div>
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
