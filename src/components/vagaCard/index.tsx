import { Link } from "react-router-dom";
import { vaga } from "../../pages/sys/vagas/vagas";
import { ProfilePic } from "../profile-pic/profile-pic";
import { VagaCardStyle } from "./style";

type eunaosei = {
  vaga: vaga;
};
export function VagaCard({ vaga }: eunaosei) {
  return (
    <VagaCardStyle className="vaga">
      <div className="vaga-data">
        <div className="vaga-header">
          <div className="photo-align">
            <ProfilePic
              url={vaga.owner.profilepic_url}
              style={{ width: 55, height: 55}}
            />
            <div>
              <div className="vaga-titles">
                <h3>{vaga.name}</h3>
                <span>{vaga.owner.name}</span>
                <span className="vaga-city">{vaga.location}</span>
                <span className="vaga-date">{vaga.date}</span>
              </div>

              <span
                className={
                  "vaga-status "+ (vaga.status && "enabled")
                }
              >
                {vaga.status ? "ATIVO" : "INATIVO"}
              </span>
            </div>
          </div>
        </div>
        <div className="vaga-text">
          <p>{vaga.description}</p>
        </div>

        <div className="vagas-bottom">
          <Link to={vaga.id + "/candidatos"} className="vagas-candidatos">
            <i className="fas fa-user"></i>
            <span>
              {vaga.candidates.length}
              {vaga.candidates.length > 1 || vaga.candidates.length === 0
                ? " Candidatos"
                : " Candidato"}
            </span>
          </Link>
          <Link to={vaga.id + ""} className="vagas-detalhes-btn">
            Mais detalhes
          </Link>
        </div>
      </div>
    </VagaCardStyle>
  );
}
