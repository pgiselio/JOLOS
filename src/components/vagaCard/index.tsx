import { Link } from "react-router-dom";
import { vaga } from "../../pages/vagas/vagas";
import { VagaCardStyle } from "./style";

type eunaosei ={
  vaga : vaga
}
export function VagaCard({vaga} : eunaosei) {
  return (
    <VagaCardStyle className="vaga">
      <div className="vaga-data">
        <div className="vaga-header">
          <div className="vaga-titles">
            <h3>{vaga.name}</h3>
            <span>{vaga.owner.name}</span>
            <span className="vaga-city">{vaga.location}</span>
            <span className="vaga-date">{vaga.date}</span>
          </div>
          <span className={vaga.status ? "vaga-status enabled" : "vaga-status disabled"}>
            {vaga.status ? "ATIVO" : "INATIVO"}
          </span>
        </div>
        <div className="vaga-text">
          <p>
            {vaga.description}
          </p>
        </div>

        <div className="vagas-bottom">
          <Link to={vaga.id + "/candidatos"} className="vagas-candidatos">
            <i className="fas fa-user"></i> 
            <span>{vaga.candidates.length} Candidatos</span>
          </Link>
          <Link to={vaga.id + ""} className="vagas-detalhes-btn">
            Mais detalhes
          </Link>
        </div>
      </div>
    </VagaCardStyle>
  );
}
