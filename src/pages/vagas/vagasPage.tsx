import { Button } from "../../components/button";
import { VagaCard } from "../../components/vagaCard";

export function VagasPage() {
  return (
    <section>
      <div className="header-section">
        <h2>Vagas criadas</h2>
        <Button className="outlined btn-criar-nova" id="newVaga">
          Criar nova
        </Button>
      </div>
      <div className="content-grid">
        <div className="content">
          <div className="cards-container">
            <VagaCard
              title="Estágiário na área especificada"
              company="Sua empresa"
              location="João Câmara, RN"
              date="02/12/2022"
              text="bolsonaro 123"
              candidates="12"
            />
            <VagaCard
              title="Jovem Aprendiz na área especificada"
              company="Sua empresa"
              location="João Câmara, RN"
              date="13/12/2021"
              text="bolsonaro 123"
              candidates="3"
            />
            <VagaCard
              title="Jovem Aprendiz na área especificada"
              company="Sua empresa"
              location="João Câmara, RN"
              date="13/12/2021"
              text="bolsonaro 123"
              candidates="3"
            />
            <VagaCard
              title="Jovem Aprendiz na área especificada"
              company="Sua empresa"
              location="João Câmara, RN"
              date="13/12/2021"
              text="bolsonaro 123"
              candidates="3"
            />
            <VagaCard
              title="Jovem Aprendiz na área especificada"
              company="Sua empresa"
              location="João Câmara, RN"
              date="13/12/2021"
              text="bolsonaro 123"
              candidates="3"
            />
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
