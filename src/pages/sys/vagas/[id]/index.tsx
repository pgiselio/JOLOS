import { Link, Outlet, useParams } from "react-router-dom";
import Error404 from "../../../404";
import { TabsMenu, TabsMenuItem } from "../../../../components/tabs-menu";
import { vaga } from "../vagaType";
import { useQuery } from "react-query";
import { api } from "../../../../services/api";

export function VagaPage() {
  let params = useParams();
  const { data, isFetching} = useQuery<vaga>('vaga', async () =>{
    const response = await api.get(`/vaga/${params.id}`);
    return response.data;    
  });
  
  const vagaData = data;

  
  if (vagaData) {
    const date = new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(vagaData.dataCriacao));
    return (
      <>
        <div className="tree-links">
          <ul>
            <li>
              <Link to="../vagas">Vagas</Link>
            </li>
            <li>
              <Link to="">Detalhar vaga #{params.id}</Link>
            </li>
          </ul>
        </div>
        <section>
          <div className="vaga-page-header">
            <h2>{vagaData.titulo}</h2>
            <span className={"vaga-status" + vagaData.status && " enabled"}>
              {vagaData.status ? "ATIVO" : "INATIVO"}
            </span>
          </div>
          <TabsMenu sticky size="large">
            <TabsMenuItem to="" title="Detalhes" end />
            <TabsMenuItem
              to="candidatos"
              title="Candidatos"
              highlighted={vagaData.alunos.length + ""}
            />
          </TabsMenu>
          <div className="content">
            <div className="vaga-page-info">
              <ul>
                <li>
                  <div className="vaga-page-info-item">
                    <i className="fas fa-calendar-day"></i>
                    <span>{date}</span>
                  </div>
                </li>
                <li>
                  <div className="vaga-page-info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{vagaData.localizacao}</span>
                  </div>
                </li>
                <li>
                  <div className="vaga-page-info-item">
                    <i className="fas fa-book-open"></i>
                    <span>{vagaData.cursoAlvo}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="vaga-navigation">
              <Outlet context={vagaData} />
            </div>
          </div>
        </section>
      </>
    );
  } else if (!isFetching){
    return <Error404 />;
  } else{
    return (
      <p>Carregando</p>
    )
  }
}
