import { useOutletContext } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import { vaga } from "../vagas";

export function VagaSobrePage() {
  const vagaData: vaga = useOutletContext();
  return (
    <div className="vaga-columns-2">
      <div className="column-1">
        <Box>
          <BoxTitle>
            Sobre a vaga
          </BoxTitle>
          <BoxContent>
            <div className="vaga-page-description">{vagaData.description}</div>
          </BoxContent>
        </Box>
      </div>
      <div className="column-2">
        <Box>
          <BoxTitle>
            <h3>
              <i className="fas fa-exclamation-triangle"></i> Ações
            </h3>
          </BoxTitle>
          {vagaData.status ? (
            <BoxContent>
              <div className="vaga-page-actions">
                <Button className="outlined red">Fechar inscrições</Button>
                <Button className="outlined">Editar informações</Button>
              </div>
            </BoxContent>
          ) : (
            <span>
              <div className="box-message">
                <span>Essa vaga já foi encerrada</span>
              </div>
            </span>
          )}
        </Box>
      </div>
    </div>
  );
}
