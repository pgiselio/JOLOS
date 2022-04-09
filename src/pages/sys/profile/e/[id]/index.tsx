import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../../../../../components/box";
import { Button } from "../../../../../components/button";
import { PillItem, PillList } from "../../../../../components/pill";
import { ProfilePic } from "../../../../../components/profile-pic/profile-pic";
import { api } from "../../../../../services/api";
import Error404 from "../../../../404";
import { ProfilePageStyle } from "../../styles";

export default function EmpresaProfilePage({email}: {email?: string }) {
  let params = useParams();
  const { data, isFetching } = useQuery(
    "empresa",
    async () => {
      const response = await api.get(`/usuario/${email ? "email/" + email : params.id}`);
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
                  <i className="fas fa-map-marker-alt"></i>
                  <span>LOCALIZAÇÃO</span>
              </PillItem>
            </PillList>
          </div>
        </div>
      </ProfilePageStyle>
    </>
  );
}
