import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box } from "../../../../components/box";
import { Button } from "../../../../components/button";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { usersList, vaga } from "../vagas";

export function VagaCandidatoPage() {
  const vagaData: vaga = useOutletContext();
  const [checked, setChecked] = useState([]);
  return (
    <Box
      head={
        <>
          <input type="checkbox" name="" id="candidato-checkall" />
          <label htmlFor="candidato-checkall">Selecionar tudo</label>
        </>
      }
    >
      <span>
        {vagaData.candidates.length > 0 ? (
          <ul className="lista-candidatos">
            {vagaData.candidates.map((candidato) => {
              let user = usersList.find((user) => user.id === candidato);
              if (user) {
                return (
                  <li className="candidato" key={user.id}>
                    <button>
                      <input
                        type="checkbox"
                        name=""
                        className="candidato-list-check"
                      />
                      <a
                        href="../perfil/pessoa/jose-nascimento.html"
                        className="candidato-group"
                      >
                        <ProfilePic
                          url={user.profilepic_url}
                          className="candidato-pic"
                        />
                        <div className="candidato-info">
                          <h3>{user.name}</h3>
                          <span>{user.email}</span>
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
            <div className="box-message">
              <span>Sem candidatos para essa vaga</span>
            </div>
          </span>
        )}
      </span>
    </Box>
  );
}
