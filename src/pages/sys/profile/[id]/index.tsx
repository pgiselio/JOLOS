import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";
import { PillItem, PillList } from "../../../../components/pill";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { Skeleton } from "../../../../components/skeleton-load";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import { cnpjMask } from "../../../../utils/cnpjMask";
import Error404 from "../../../404";
import { ProfilePageStyle } from "../styles";

export default function ProfilePage({ email }: { email?: string }) {
  let params = useParams();
  let usertype;
  const auth = useAuth();
  const { data, isFetching } = useQuery(
    ["profile", email ? email : params.id],
    async () => {
      const response = await api.get(
        `/usuario/${email ? "email/" + email : params.id}`
      );
      return response.data;
    },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  );
  function getFormattedDate(date: Date) {
    if (!date) {
      return;
    }
    date = new Date(date);
    let dateFormatted = new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
    return dateFormatted;
  }

  if (!data && !isFetching) {
    return <Error404 />;
  }
  if (data?.aluno) {
    usertype = "ALUNO";
  } else if (data?.empresa) {
    usertype = "EMPRESA";
  } else {
    usertype = "ADMIN";
  }
  return (
    <>
      <ProfilePageStyle>
        <div className="profile-page-header">
          <div className="profile-page-header-container">
            <div className="user-info">
              <ProfilePic />

              <div className="profile-names">
                {isFetching ? (
                  <>
                    <h2>
                      <Skeleton variant="text" width="200px" height="30px" />
                    </h2>
                    <span>
                      <Skeleton variant="text" width="150px" height="20px" />
                    </span>
                  </>
                ) : (
                  <>
                    <h2>
                      {usertype === "ALUNO"
                        ? data.aluno.dadosPessoa.nome
                        : usertype === "EMPRESA"
                        ? data.empresa.dadosPessoa.nome
                        : data?.email}
                    </h2>
                    <span>
                      {usertype === "ALUNO"
                        ? data.email
                        : usertype === "EMPRESA"
                        ? cnpjMask(data.empresa.cnpj)
                        : data?.email}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="user-actions">
              {data?.email === auth.email && (
                <>
                  <Button>
                    <i className="fas fa-pencil-alt"></i>

                    <span>Editar perfil</span>
                  </Button>
                </>
              )}
              {usertype === "ALUNO" && (
                <Button className="outlined">
                  <i className="fas fa-arrow-down"></i>
                  Baixar currículo
                </Button>
              )}
            </div>
          </div>
        </div>
        {isFetching ? (
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
              height="50px"
              width="50px"
              duration=".8s"
            />
          </p>
        ) : (
          <div className="content">
            <div className="profile-page-info">
              <PillList>
                {usertype === "ALUNO" && (
                  <PillItem>
                    <i className="fas fa-calendar-day"></i>
                    <span>
                      {getFormattedDate(data?.aluno?.dadosPessoa.dataNasc)}
                    </span>
                  </PillItem>
                )}
                {usertype !== "ADMIN" && (
                  <PillItem>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>
                      {usertype === "ALUNO"
                        ? data?.aluno?.dadosPessoa.localizacao
                        : data?.empresa?.dadosPessoa.localizacao}
                    </span>
                  </PillItem>
                )}

                {usertype === "ALUNO" && (
                  <PillItem title="Curso">
                    <i className="fas fa-book-open"></i>
                    <span>{data?.aluno?.curso} - </span>
                    <span title="Período do curso">
                      <i className="fas fa-clock"></i>
                      <span>{data?.aluno?.periodo}</span>
                    </span>
                  </PillItem>
                )}
              </PillList>
            </div>
            {usertype === "ALUNO" && (
              <Box>
                <BoxTitle>
                  <h3>Sobre</h3>
                </BoxTitle>
                <BoxContent>
                  <p>{data?.status}</p>
                </BoxContent>
              </Box>
            )}
            {usertype === "EMPRESA" && (
              <div className="vaga-columns-2">
                <div className="column-1">
                  <Box>
                    <BoxTitle>
                      <h3>Sobre nós</h3>
                    </BoxTitle>
                    <BoxContent>
                      <div className="vaga-page-description">
                        <p>{data?.empresa?.resumo}</p>
                      </div>
                    </BoxContent>
                  </Box>
                </div>
                <div className="column-2">
                  <Box>
                    <BoxTitle>
                      <h3>Contato</h3>
                    </BoxTitle>
                    <BoxContent>
                      <div className="contacts">
                        <ul className="essential-info">
                          <li>
                            <a href="#oi">
                              <i className="fas fa-envelope"></i>{" "}
                              <span>email@seusite.com.br</span>
                            </a>
                          </li>
                          <li>
                            <a href="#oi">
                              <i className="fas fa-phone-alt"></i>{" "}
                              <span>(84) 0000-0000</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </BoxContent>
                  </Box>
                  <Box>
                    <BoxContent>
                      <ul className="social-info">
                        <li>
                          <a href="#oi" target="_blank">
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#oi" target="_blank">
                            <i className="fab fa-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#oi" target="_blank">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#oi" target="_blank">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                      </ul>
                    </BoxContent>
                  </Box>
                </div>
              </div>
            )}
          </div>
        )}
      </ProfilePageStyle>
    </>
  );
}