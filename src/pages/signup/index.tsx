import { useState } from "react";
import { useTabs } from "react-headless-tabs";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../../components/input";
import { TabSelector } from "../../components/Tabs/TabSelector";
import { api } from "../../services/api";
import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type signupType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function CadastroPage() {
  const [selectedTab, setSelectedTab] = useTabs(["Aluno", "Empresa"], "Aluno");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Esse não é um endereço de e-mail válido!")
      .required("O e-mail é obrigatório"),
    password: Yup.string()
      .required("A senha é obrigatória")
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmPassword: Yup.string()
      .required("Corfirmar senha é obrigatório")
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
    resolver: yupResolver(validationSchema)
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
          formSubmit(email, password, confirmPassword);
        }
      });
  }
  async function formSubmit(email: string, password: string, confirmPassword: string){ 
    return await api
      .post("/usuario/create", { email, senha: password})
      .catch(function () {
        toast.error("O email cadastrado já existe!", {});
      })
      .finally(() => setIsLoading(false));
  };
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 className="desc">Criar conta</h2>

                <div
                  style={{ display: "flex", height: "35px", columnGap: "10px" }}
                >
                  <TabSelector
                    isActive={selectedTab === "Aluno"}
                    onClick={() => setSelectedTab("Aluno")}
                  >
                    Aluno
                  </TabSelector>
                  <TabSelector
                    isActive={selectedTab === "Empresa"}
                    onClick={() => setSelectedTab("Empresa")}
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
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          id="email"
                          placeholder="E-mail"
                          {...field}
                        />
                      )}
                    />
                    <p>{errors.email?.message}</p>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="password"
                          id="password"
                          placeholder="Senha"
                          {...field}
                        />
                      )}
                    />
                    <p>{errors.password?.message}</p>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="password"
                          id="passwordconfirm"
                          placeholder="Confirmar senha"
                          {...field}
                        />
                      )}
                    />
                    <p>{errors.confirmPassword?.message}</p>
                  </section>
                  <div className="info-message">
                    {selectedTab === "Aluno" ? (
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
              <div className="imagem-destaque">
                <img src="../images/undraw_typewriter_re_u9i2.svg" alt="" />
              </div>
              {selectedTab === "Aluno" ? (
                <span>Sua conta a três passos de você</span>
              ) : (
                <span>Faça o pré-cadastro da sua empresa</span>
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
                {... isLoading && {disabled: true}}
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </section>
    </StyledAccess>
  );
}
