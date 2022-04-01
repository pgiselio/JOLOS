import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../../../../../components/box";
import { Button } from "../../../../../components/button";
import { PillItem, PillList } from "../../../../../components/pill";
import { ProfilePic } from "../../../../../components/profile-pic/profile-pic";
import { api } from "../../../../../services/api";
import Error404 from "../../../../404";
import { ProfilePageStyle } from "../../styles";

export default function EmpresaProfilePage() {
  let params = useParams();
  const { data, isFetching } = useQuery(
    "empresa",
    async () => {
      const response = await api.get(`/usuario/${params.id}`);
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute to refetch
    }
  );
  if(!data && !isFetching){
    return <Error404/>
  }
  return (
    <>
      <ProfilePageStyle>
        <div className="profile-page-header">
          <div className="profile-page-header-container">
            <div className="user-info">
              <ProfilePic />
              <div className="profile-names">
                <h2>Sua empresa</h2>
                <span>XX.XXX.XXX/0001-XX</span>
              </div>
            </div>
            <div className="user-actions">
              <Button className="outlined">Editar perfil</Button>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="vaga-page-info">
            <PillList>
              <PillItem>
                <div className="vaga-page-info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>LOCALIZAÇÃO</span>
                </div>
              </PillItem>
            </PillList>
          </div>
          <div className="vaga-columns-2">
            <div className="column-1">
              <Box>
                <BoxTitle>
                  <h3>Sobre nós</h3>
                </BoxTitle>
                <BoxContent>
                  <div className="vaga-page-description">
                    
                  </div>
                </BoxContent>
              </Box>
            </div>
            <div className="column-2">
              <Box>
                <BoxTitle>
                  <h3>Contatos</h3>
                </BoxTitle>
                <BoxContent>
                  <div className="contacts">
                    <PillList className="essential-info">
                      <PillItem>
                        <a href="#oi">
                          <i className="fas fa-envelope"></i>{" "}
                          <span>email@seusite.com.br</span>
                        </a>
                      </PillItem>
                      <PillItem>
                        <a href="#oi">
                          <i className="fas fa-phone-alt"></i>{" "}
                          <span>(84) 0000-0000</span>
                        </a>
                      </PillItem>
                    </PillList>
                  </div>
                </BoxContent>
              </Box>
              <Box>
                <BoxContent>
                  <PillList className="social-info">
                    <PillItem>
                      <a href="#oi" target="_blank">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </PillItem>
                    <PillItem>
                      <a href="#oi" target="_blank">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </PillItem>
                    <PillItem>
                      <a href="#oi" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </PillItem>
                    <PillItem>
                      <a href="#oi" target="_blank">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </PillItem>
                  </PillList>
                </BoxContent>
              </Box>
            </div>
          </div>
        </div>
      </ProfilePageStyle>
    </>
  );
}
