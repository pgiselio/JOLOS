import { useOutletContext } from "react-router-dom";
import { Button } from "../../../components/button";
import { vaga } from "../vagas";

export function VagaSobrePage() {
  const vagaData: vaga = useOutletContext();
  return (
    <div className="vaga-columns-2">
      <div className="column-1">
        <div className="box">
          <div className="box-title">
            <h3>Sobre a vaga</h3>
          </div>
          <div className="box-content">
            <div className="vaga-page-description">{vagaData.description}</div>
          </div>
        </div>
      </div>
      <div className="column-2">
        <div className="box">
          <div className="box-title">
            <h3>
              <i className="fas fa-exclamation-triangle"></i> Ações
            </h3>
          </div>
          {vagaData.status ? (
            <div className="box-content">
              <div className="vaga-page-actions">
                <Button className="outlined red">Fechar inscrições</Button>
                <Button className="outlined">Editar informações</Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="box-message">
                <span>Essa vaga já foi encerrada</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
