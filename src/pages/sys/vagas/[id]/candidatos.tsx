import { useState } from "react";
import { useVaga } from ".";
import { Box, BoxMessage, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";
import { LoadingPage } from "../../../../components/loadingPage";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";

export function VagaCandidatoPage() {
  const { data } = useVaga();
  const [checked, setChecked] = useState([]);
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
    <Box>
      <BoxTitle>
        <input type="checkbox" name="" id="candidato-checkall" />
        <label htmlFor="candidato-checkall">Selecionar tudo</label>
      </BoxTitle>

      <span>
        {data.alunos.length > 0 ? (
          <ul className="lista-candidatos">
            {data.alunos.map((candidato) => {
              // let user = usersList.find((user) => user.id === candidato);
              if (candidato) {
                return (
                  <li className="candidato" key={candidato}>
                    <button>
                      <input
                        type="checkbox"
                        name=""
                        className="candidato-list-check"
                      />
                      <a href="#aluno" className="candidato-group">
                        <ProfilePic className="candidato-pic" />
                        <div className="candidato-info">
                          <h3>{candidato}</h3>
                          <span>{candidato}</span>
                        </div>
                      </a>
                    </button>
                  </li>
                );
              }
              return <></>;
            })}

            <div className="lista-candidatos-actions">
              <Button className="less-radius">Baixar currículos</Button>
            </div>
          </ul>
        ) : (
          <span>
            <BoxMessage>
              <span>Sem candidatos para essa vaga</span>
            </BoxMessage>
          </span>
        )}
      </span>
    </Box>
  );
}
