import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import CircularProgressFluent from "../../../components/circular-progress-fluent";
import { Input } from "../../../components/input";
import { CadastroStep3Style } from "./styles";

export function CadastroStep3() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  return (
    <CadastroStep3Style>
      <div className="content">
        <h2 className="desc">Seus Dados</h2>
        <div className="inputs">
          <div className="lbl">
            <label htmlFor="nome">Nome: </label>
            <Input
              icon="fas fa-pencil"
              type="text"
              id="nome"
              placeholder="Nome completo"
            />
          </div>
          <div className="input-group">
            <div className="lbl">
              <label htmlFor="cidade">Cidade: </label>
              <Input
                icon="fas fa-location-dot"
                type="text"
                id="cidade"
                placeholder="Cidade"
              />
            </div>
            <div className="lbl" style={{ maxWidth: "60px" }}>
              <label htmlFor="UF">UF: </label>
              <ReactInputMask maskPlaceholder={null} mask="aa">
                <Input type="text" id="UF" placeholder="UF" />
              </ReactInputMask>
            </div>
          </div>
          <div className="lbl">
            <label htmlFor="cpf">CPF: </label>
            <ReactInputMask maskPlaceholder={null} mask="999.999.999-99">
              <Input
                icon="fas fa-id-card"
                type="text"
                id="cpf"
                placeholder="CPF"
              />
            </ReactInputMask>
          </div>
          <div className="lbl">
            <label htmlFor="dataNascimento">Data de Nascimento: </label>
            <Input
              type="date"
              placeholder="Data de nascimento"
              icon="fas fa-calendar"
              id="dataNascimento"
            />
          </div>

          <div className="input-group no-wrap">
            <div className="lbl">
              <label htmlFor="curso">Curso: </label>
              <Input type="text" placeholder="Curso" id="curso" icon="fas fa-book-open" />
            </div>
            <div className="lbl" style={{ maxWidth: "70px" }}>
              <label htmlFor="periodo">Período: </label>
              <ReactInputMask maskPlaceholder={null} mask="99">
                <Input type="text" id="periodo" placeholder="Período" style={{textAlign: "center"}}/>
              </ReactInputMask>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-actions">
        <div className="flex-btn-login"></div>
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
    </CadastroStep3Style>
  );
}
