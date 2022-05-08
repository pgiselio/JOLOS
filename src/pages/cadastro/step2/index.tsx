import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CircularProgressFluent from "../../../components/circular-progress-fluent";
import { Input } from "../../../components/input";
import { CadastroStep2Style } from "./styles";

export default function VerifiqueOSeuEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    
  }, [])
  return (
    <CadastroStep2Style>
      <div className="content">
        <h1>
          <i className="fas fa-envelope"></i>
        </h1>
        <h2>Verifique o seu e-mail</h2>
        <span className="message">
          Para continuar com o cadastro digite nos campos abaixo o código que você recebeu no seu
          e-mail
        </span>
        <div className="code-fields">
          <Input type="text" name="n1" maxLength={1} className="code-field" autoComplete="off"/>
          <Input type="text" name="n2" maxLength={1} className="code-field" autoComplete="off"/>
          <Input type="text" name="n3" maxLength={1} className="code-field" autoComplete="off"/>
          <Input type="text" name="n4" maxLength={1} className="code-field" autoComplete="off" />
          <Input type="text" name="n5" maxLength={1} className="code-field" autoComplete="off"/>
          <Input type="text" name="n6" maxLength={1} className="code-field" autoComplete="off"/>
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
            type="button"
            className="btn-next"
            title="Confirmar cadastro"
            form="cadastroStep1"
            id="cadastroSubmit"
            onClick={() => navigate("../step3")}
            disabled={isLoading}
          >
            <span>Próximo</span>
            <span className="next-arrow">
              {isLoading ? (
                <CircularProgressFluent
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
    </CadastroStep2Style>
  );
}
