import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  BoxContent,
  BoxMessage,
  BoxTitle,
} from "../../../../components/box";
import { Button } from "../../../../components/button";
import CircularProgressFluent from "../../../../components/circular-progress-fluent";
import LabelWithData from "../../../../components/label-data";
import { PillItem, PillList } from "../../../../components/pill";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { Skeleton } from "../../../../components/skeleton-load";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import { User } from "../../../../types/user";
import { cnpjMask } from "../../../../utils/cnpjMask";
import Error404 from "../../../404";
import { ProfilePageStyle } from "../styles";

export default function ProfilePage() {
  let params = useParams();
  let usertype;
  let navigate = useNavigate();
  const auth = useAuth();
  const { data, isFetching } = useQuery<User>(
    ["profile" + params.id],
    async () => {
      const response = await api.get(`/usuario/${params.id}`);
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
                        ? data?.aluno?.dadosPessoa.nome
                        : usertype === "EMPRESA"
                        ? data?.empresa?.dadosPessoa.nome
                        : data?.email}
                    </h2>
                    <span>
                      {usertype === "ALUNO"
                        ? data?.email
                        : data?.empresa?.dadosPessoa
                        ? cnpjMask(data?.empresa?.cnpj)
                        : data?.email}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="user-actions">
              {data?.email === auth.email && (
                <>
                  <Button
                    onClick={() => {
                      navigate("/sys/settings?tab=profile");
                    }}
                  >
                    <i className="fas fa-pencil-alt"></i>

                    <span>Editar perfil</span>
                  </Button>
                </>
              )}
              {usertype === "ALUNO" && (
                <Button
                  className="outlined"
                  onClick={() => {
                    navigate(`/download/curriculo/${data?.aluno?.curriculo}`);
                  }}
                >
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
              <div className="labelDatas">
                {data?.aluno?.dadosPessoa && (
                  <LabelWithData
                    data={
                      auth.userInfo?.aluno?.dadosPessoa.dataNasc &&
                      getFormattedDate(data?.aluno?.dadosPessoa.dataNasc)
                    }
                    label="Data de Nascimento:"
                    icon="fas fa-calendar-day"
                  />
                )}
                {usertype !== "ADMIN" && (
                  <LabelWithData
                    data={
                      usertype === "ALUNO"
                        ? data?.aluno?.dadosPessoa.localizacao
                        : data?.empresa?.dadosPessoa.localizacao
                    }
                    label="Localização:"
                    icon="fas fa-map-marker-alt"
                  />
                )}

                {usertype === "ALUNO" && (
                  <LabelWithData
                    data={
                      <>
                        <span style={{ textTransform: "capitalize" }}>
                          {data?.aluno?.curso.toLocaleLowerCase()}{" "}
                        </span>
                        <span title="Período do curso">
                          <span>{data?.aluno?.periodo}º P</span>
                        </span>
                      </>
                    }
                    label="Curso e Período:"
                    icon="fas fa-book-open"
                  />
                )}
              </div>
            </div>
            {usertype === "ALUNO" && (
              <Box>
                <BoxTitle>
                  <h3>Sobre</h3>
                </BoxTitle>
                {data?.aluno?.resumo ? (
                  <BoxContent>
                    <p>{data?.aluno?.resumo}</p>
                  </BoxContent>
                ) : (
                  <BoxMessage className="no-about-message">
                    <span>
                      Oops... parece que alguém se esqueceu de fazer o "sobre
                      mim"
                    </span>
                  </BoxMessage>
                )}
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
                      <div className="profile-description">
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
                            <a href={"mailto:" + data?.email}>
                              <i className="fas fa-envelope"></i>{" "}
                              <span>{data?.email}</span>
                            </a>
                          </li>
                          <li>
                            <a href={"tel:" + data?.empresa?.telefone}>
                              <i className="fas fa-phone-alt"></i>{" "}
                              <span>{data?.empresa?.telefone}</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </BoxContent>
                  </Box>
                  {data?.empresa?.redesSociais && (
                    <Box>
                      <BoxContent>
                        <ul className="social-info">
                          {data?.empresa?.redesSociais.linkedin && (
                            <li>
                              <a
                                href={`https://www.linkedin.com/company/${data?.empresa?.redesSociais.linkedin}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <i className="fab fa-linkedin"></i>
                              </a>
                            </li>
                          )}
                          {data?.empresa?.redesSociais.facebook && (
                            <li>
                              <a
                                href={`https://www.facebook.com/${data?.empresa?.redesSociais.facebook}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <i className="fab fa-facebook"></i>
                              </a>
                            </li>
                          )}
                          {data?.empresa?.redesSociais.instagram && (
                            <li>
                              <a
                                href={`https://www.instagram.com/${data?.empresa?.redesSociais.instagram}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <i className="fab fa-instagram"></i>
                              </a>
                            </li>
                          )}
                          {data?.empresa?.redesSociais.twitter && (
                            <li>
                              <a
                                href={`https://www.twitter.com/${data?.empresa?.redesSociais.twitter}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <i className="fab fa-twitter"></i>
                              </a>
                            </li>
                          )}
                        </ul>
                      </BoxContent>
                    </Box>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </ProfilePageStyle>
    </>
  );
}
