import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../../../../../components/box";
import { Button } from "../../../../../components/button";
import { PillItem, PillList } from "../../../../../components/pill";
import { ProfilePic } from "../../../../../components/profile-pic/profile-pic";
import { api } from "../../../../../services/api";
import { ProfilePageStyle } from "../../styles";

export default function AlunoProfilePage({email}: {email?: string }) {
  let params = useParams();
  const { data, isFetching } = useQuery(
    "profile",
    async () => {
      const response = await api.get(`/usuario/${email ? "email/" + email : params.id}`);
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute to refetch
    }
  );
  return (
    <>
      <ProfilePageStyle>
        <div className="profile-page-header">
          <div className="profile-page-header-container">
            <div className="user-info">
              <ProfilePic />
              <div className="profile-names">
                <h2>José Antônio Nascimento</h2>
                <span>josenascimento@email.com</span>
              </div>
            </div>
            <div className="user-actions">
              <Button className="outlined">
                <i className="fas fa-arrow-down"></i>
                Baixar currículo
              </Button>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="vaga-page-info">
            <PillList>
              <PillItem>
                <div className="vaga-page-info-item">
                  <i className="fas fa-calendar-day"></i>
                  <span>DATA NASCIMENTO</span>
                </div>
              </PillItem>
              <PillItem>
                <div className="vaga-page-info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>CIDADE</span>
                </div>
              </PillItem>
              <PillItem>
                <div className="vaga-page-info-item">
                  <i className="fas fa-book-open"></i>
                  <span>CURSANDO... PERÍODO</span>
                </div>
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
