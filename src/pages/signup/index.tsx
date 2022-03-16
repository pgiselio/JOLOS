import { TabPanel, useTabs } from "react-headless-tabs";
import { Link } from "react-router-dom";
import { Input } from "../../components/input";
import { TabSelector } from "../../components/Tabs/TabSelector";
import { AccessGlobalStyle, StyledAccess } from "../../styles/LoginSignupStyle";

export function CadastroPage() {
  const [selectedTab, setSelectedTab] = useTabs(["Aluno", "Empresa"]);

  return (
    <StyledAccess>
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
          <nav className="flex border-b border-gray-300">
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
          </nav>
          <TabPanel hidden={selectedTab !== "Aluno"}>
            <form id="cadastroStep1" action="" method="post">
              <div className="group2">
                <div className="group3">
                  <h2 className="desc">Criar conta</h2>
                  <section className="inputs">
                    <Input
                      type="text"
                      id="fullname"
                      placeholder="Nome completo"
                    />
                    <Input type="text" id="email" placeholder="E-mail" />
                    <Input
                      type="text"
                      id="cpf"
                      placeholder="CPF"
                      data-js="cpf"
                    />
                    <div className="input-group">
                      <Input
                        type="password"
                        name=""
                        id="pass"
                        placeholder="Senha"
                      />
                      <Input
                        type="password"
                        name=""
                        id="confirm-pass"
                        placeholder="Confirmar senha"
                      />
                    </div>
                  </section>
                  <div className="info-message">
                    <span>
                      O cadastro continuará após a confirmação do e-mail, então
                      certifique-se de informar um e-mail válido
                    </span>
                  </div>
                </div>
                <div className="group4">
                  <div className="imagem-destaque">
                    <img src="../images/undraw_typewriter_re_u9i2.svg" alt="" />
                  </div>
                </div>
              </div>
            </form>
          </TabPanel>
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
