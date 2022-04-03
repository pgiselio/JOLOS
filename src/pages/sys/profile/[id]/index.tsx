import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../../../../components/box";
import { Button } from "../../../../components/button";
import { PillItem, PillList } from "../../../../components/pill";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import { ProfilePageStyle } from "../styles";

export default function ProfilePage({ email }: { email?: string }) {
  let params = useParams();
  let usertype;
  const auth = useAuth();
  const { data, isFetching } = useQuery(
    "profile-" + (email ? email : params.id),
    async () => {
      const response = await api.get(
        `/usuario/${email ? "email/" + email : params.id}`
      );
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute to refetch
    }
  );
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
                    ? data.empresa.cnpj
                    : data?.email}
                </span>
              </div>
            </div>
            <div className="user-actions">
              {data?.email === auth.email && (
                <>
                  {usertype === "ALUNO" && (
                    <Button className="outlined">
                      <i className="fas fa-arrow-down"></i>
                      Baixar currículo
                    </Button>
                  )}
                  <Button>
                    <i className="fas fa-pencil-alt"></i>

                    <span>Editar perfil</span>
                  </Button>
                </>
              )}
              {usertype === "ALUNO" && auth.type !== "ALUNO" && (
                <Button className="outlined">
                  <i className="fas fa-arrow-down"></i>
                  Baixar currículo
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="vaga-page-info">
            <PillList>
              <PillItem>
                <i className="fas fa-calendar-day"></i>
                <span>{data?.aluno?.dadosPessoa.dataNasc}</span>
              </PillItem>
              <PillItem>
                <i className="fas fa-map-marker-alt"></i>
                <span>{data?.aluno?.dadosPessoa.localizacao}</span>
              </PillItem>
              <PillItem>
                <i className="fas fa-book-open"></i>
                <span>{data?.aluno?.curso} - </span>
                <span title="Período do curso">
                  <i className="fas fa-clock"></i>
                  <span>{data?.aluno?.periodo}</span>
                </span>
              </PillItem>
            </PillList>
          </div>
          <Box>
            <BoxTitle>
              <h3>Sobre</h3>
            </BoxTitle>
            <BoxContent>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a
                gravida mi. Donec et mauris quis massa convallis vulputate.
                Etiam a lectus et nunc interdum suscipit eu ultrices diam. Nulla
                ullamcorper semper velit sit amet pulvinar. Pellentesque et nisi
                dui. Nulla quis dignissim dui. Nunc ex placerat.
              </p>
            </BoxContent>
          </Box>
        </div>
      </ProfilePageStyle>
    </>
  );
}
