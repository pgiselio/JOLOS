import { VagaCardStyle } from "./style";

type card = {
  title : string
  company : string
  location : string
  date : string
  text : string
  candidates : string
}

export function VagaCard(Props : card) {
  return (
    <VagaCardStyle className="vaga">
      <div className="vaga-data">
        <div className="vaga-header">
          <div className="vaga-titles">
            <h3>{Props.title}</h3>
            <span>{Props.company}</span>
            <span className="vaga-city">{Props.location}</span>
            <span className="vaga-date">{Props.date}</span>
          </div>
          <span className="vaga-status enabled">ATIVO</span>
        </div>
        <div className="vaga-text">
          <p>
            {Props.text}
          </p>
        </div>

        <div className="vagas-bottom">
          <a href="vagas/01-candidatos.html" className="vagas-candidatos">
            <i className="fas fa-user"></i> 
            <span>{Props.candidates} Candidatos</span>
          </a>
          <a href="vagas/01.html" className="vagas-detalhes-btn">
            Mais detalhes
          </a>
        </div>
      </div>
    </VagaCardStyle>
  );
}
