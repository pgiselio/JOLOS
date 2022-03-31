import { Link } from "react-router-dom";
import { vaga } from "../../pages/sys/vagas/vagaType";
import { ProfilePic } from "../profile-pic/profile-pic";
import { VagaCardStyle } from "./style";

type vagaObj = {
  vaga: vaga;
};
export function VagaCard({ vaga }: vagaObj) {
  const date = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(vaga.dataCriacao));
  return (
    <VagaCardStyle className="vaga">
      <div className="vaga-data">
        <div className="vaga-header">
          <div className="photo-align">
            <ProfilePic style={{ width: 55, height: 55 }} />
            <div>
              <div className="vaga-titles">
                <h3>{vaga.titulo}</h3>
                <span>{vaga?.empresa?.dadosPessoa.nome}</span>
              </div>

              <span
                className={
                  "vaga-status " + (vaga.status === "ATIVO" && "enabled")
                }
              >
                {vaga.status === "ATIVO" ? "ATIVO" : "INATIVO"}
              </span>
            </div>
          </div>
        </div>
        <div className="vaga-text">
          <p>
            <span className="vaga-city">{vaga.localizacao}</span>
            <span className="vaga-date">{date}</span>
          </p>
        </div>

        <div className="vagas-bottom">
          <Link to={`${vaga.id}/candidatos`} className="vagas-candidatos">
            <i className="fas fa-user"></i>
            <span>
              {vaga.alunos.length}
              {vaga.alunos.length > 1 || vaga.alunos.length === 0
                ? " Candidatos"
                : " Candidato"}
            </span>
          </Link>
          <Link to={`${vaga.id}`} className="vagas-detalhes-btn">
            Mais detalhes
          </Link>
        </div>
      </div>
    </VagaCardStyle>
  );
}
