import { Outlet, useParams } from "react-router-dom";
import Error404 from "../../../404";
import { TabsMenu, TabsMenuItem } from "../../../../components/tabs-menu";
import { vaga } from "../vagaType";
import { useQuery } from "react-query";
import { api } from "../../../../services/api";
import { Skeleton } from "../../../../components/skeleton-load";
import { ProfilePic } from "../../../../components/profile-pic/profile-pic";
import { VagaPageStyle } from "./styles";
import { PillItem, PillList } from "../../../../components/pill";

export default function VagaPage() {
  let params = useParams();
  const { data, isFetching } = useQuery<vaga>(
    ["vagas", params.id],
    async () => {
      const response = await api
        .get(`/vaga/lista/${params.id}`)
        .catch((error) => (error.response.status === 400 ? null : error));
      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const vagaData = data;

  let date;
  let dateFormatted;

  if (vagaData) {
    date = new Date(vagaData.dataCriacao);
    dateFormatted = new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
  } else if (!isFetching) {
    return <Error404 />;
  }
  return (
    <>
      <div className="tree-PillItemnks"></div>
      <VagaPageStyle>
        <div className="vaga-page-header content">
          {isFetching ? (
            <Skeleton variant="circle" width="60px" height="60px" />
          ) : (
            <ProfilePic style={{ width: "60px", height: "60px" }} />
          )}
          {isFetching ? (
            <Skeleton variant="text" width="300px" height="35px" />
          ) : (
            <h2>{vagaData?.titulo}</h2>
          )}

          {isFetching ? (
            <Skeleton variant="text" width="60px" height="25px" />
          ) : (
            <span
              className={
                "vaga-status " + (vagaData?.status === "ATIVO" && "enabled")
              }
            >
              {vagaData?.status ? "ATIVO" : "INATIVO"}
            </span>
          )}
        </div>
        <TabsMenu sticky size="large">
          <TabsMenuItem to="" title="Detalhes" end />
          <TabsMenuItem
            to="candidatos"
            title="Candidatos"
            highlighted={!isFetching ? vagaData?.alunos.length + "" : ""}
          />
        </TabsMenu>
        <div className="content">
          <div className="vaga-page-info">
            <PillList style={{ marginTop: 10 }}>
              <PillItem>
                <i className="fas fa-calendar-day"></i>
                {isFetching ? (
                  <Skeleton variant="text" width="130px" height="25px" />
                ) : (
                  <span>{dateFormatted}</span>
                )}
              </PillItem>
              <PillItem>
                <i className="fas fa-map-marker-alt"></i>
                {isFetching ? (
                  <Skeleton variant="text" width="150px" height="25px" />
                ) : (
                  <span>{vagaData?.localizacao}</span>
                )}
              </PillItem>
              <PillItem>
                <i className="fas fa-book-open"></i>
                {isFetching ? (
                  <Skeleton variant="text" width="150px" height="25px" />
                ) : (
                  <span>{vagaData?.cursoAlvo}</span>
                )}
              </PillItem>
            </PillList>
          </div>
          <div className="vaga-navigation">
            {isFetching ? (
              <Skeleton
                variant="square"
                width="100%"
                height="300px"
                style={{ marginTop: "20px" }}
              />
            ) : (
              <Outlet context={vagaData} />
            )}
          </div>
        </div>
      </VagaPageStyle>
    </>
  );
}
