import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { OutsetHeadersCornerRadius } from "../../components/outset-radius-to-headers";
import { VagaCard } from "../../components/vagaCard";
import { vaga, vagasListTest } from "./vagas";

export function VagasList() {
  const [vagasRepo, setVagasRepo] = useState<vaga[]>(vagasListTest);
  useEffect(() => {
    setVagasRepo(vagasListTest);
  }, [vagasListTest]);
  return (
    <section>
      <OutsetHeadersCornerRadius>
        <div className="header-section">
          <h2>Vagas criadas</h2>
          <Button className="outlined" id="newVaga">
            <i className="fas fa-plus"></i>
            Criar nova
          </Button>
        </div>
      </OutsetHeadersCornerRadius>
      <div className="content-grid">
        <div className="content">
          <div className="cards-container">
            {vagasRepo.map(vaga => {
              return(
                <VagaCard
                  key={vaga.id}
                  vaga={vaga}
                />
              );
            })}
          </div>
        </div>
        <div className="filters hide">
          <h3>Filtros</h3>
          <div></div>
        </div>
      </div>
    </section>
  );
}
