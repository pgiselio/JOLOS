import { useOutletContext } from "react-router-dom";
import { Box, BoxContent, BoxMessage, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import { useAuth } from "../../../../hooks/useAuth";
import { vaga } from "../vagaType";

export function VagaSobrePage() {
  const vagaData: vaga = useOutletContext();
  const auth = useAuth();
  const isAluno = auth.type === "ALUNO";
  return (
    <div className={!isAluno ? "vaga-columns-2" : ""}>
      <div className="column-1">
        <Box>
          <BoxTitle>Sobre a vaga</BoxTitle>
          <BoxContent>
            <div className="vaga-page-description">{vagaData.descricao}</div>
          </BoxContent>
        </Box>
      </div>
      {!isAluno && (
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
                  <Button className="red less-radius">Fechar inscrições</Button>
                  <Button className="less-radius">Editar informações</Button>
                </div>
              </BoxContent>
            ) : (
              <span>
                <BoxMessage>
                  <span>Essa vaga já foi encerrada</span>
                </BoxMessage>
              </span>
            )}
          </Box>
        </div>
      )}
    </div>
  );
}
