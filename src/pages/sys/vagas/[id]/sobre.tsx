import { useVaga } from ".";
import {
  Box,
  BoxContent,
  BoxMessage,
  BoxTitle,
} from "../../../../components/box";
import { Button } from "../../../../components/button";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";
import { useAuth } from "../../../../hooks/useAuth";
import { useUser } from "../../../../hooks/useUser";

export function VagaSobrePage() {
  const { data } = useVaga();
  const auth = useAuth();
  const user = useUser();
  const isAluno = auth.type === "ALUNO";
  if (!data) {
    return (
      <p
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          paddingTop: "30px",
        }}
      >
        <CircularProgressFluent
          color="var(--accent-color)"
          height="30px"
          width="30px"
          duration=".9s"
        />
        Carregando...
      </p>
    );
  }
  return (
    <div className={!isAluno ? "vaga-columns-2" : ""}>
      <div className="column-1">
        <Box>
          <BoxTitle>Sobre a vaga</BoxTitle>
          <BoxContent>
            <div className="vaga-page-description">{data.descricao}</div>
          </BoxContent>
        </Box>
      </div>
      {console.log((!user.aluno && !user.empresa))}
      
      {( (!isAluno && user?.id === data.empresa?.id) || (!user.aluno && !user.empresa) ) &&(
        <div className="column-2">
          <Box>
            <BoxTitle>
              <h3>
                <i className="fas fa-exclamation-triangle"></i> Ações
              </h3>
            </BoxTitle>
            {data.status ? (
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
