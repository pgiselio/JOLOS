import { useOutletContext } from "react-router-dom";
import { Button } from "../../../components/button";
import { ProfilePic } from "../../../components/profile-pic/profile-pic";
import { user, usersList, vaga } from "../vagas";

export function VagaCandidatoPage() {
  const vagaData: vaga = useOutletContext();
  return (
    <div className="content">
      <div className="box">
        <div className="box-title check sticky">
          <h3>
            <input type="checkbox" name="" id="candidato-checkall" />
            <label htmlFor="candidato-checkall">Selecionar tudo</label>
          </h3>
        </div>
        <div>
          {vagaData.candidates.length > 0 ? (
            <ul className="lista-candidatos">
              {vagaData.candidates.map((candidato) => {
                let user = usersList.find((a) => a.id === candidato.id);
                if (user) {
                  let userTyped: user = user;
                  return (
                    <li className="candidato" key={userTyped.id}>
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
                          {...(userTyped.profilepic_url && {
                            url: userTyped.profilepic_url,
                          })}
                          className="candidato-pic"
                        />
                        <div className="candidato-info">
                          <h3>{userTyped.name}</h3>
                          <span>{userTyped.email}</span>
                        </div>
                      </a>
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
            <div>
              <div className="box-message">
                <span>Sem candidatos para essa vaga</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
