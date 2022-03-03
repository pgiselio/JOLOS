import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { vagasListTest } from "../vagas";
import { Error404 } from "../../404";

export function VagaPage() {
  let params = useParams();
  const vagaData = vagasListTest.find(
    (vaga) => vaga.id === Number.parseInt(params.id + "")
  );
  if (vagaData) {
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
            <h2>{vagaData.name}</h2>
            <span
              className={
                vagaData.status ? "vaga-status enabled" : "vaga-status disabled"
              }
            >
              {vagaData.status ? "ATIVO" : "INATIVO"}
            </span>
          </div>
          <div className="tabs-menu">
            <div className="spacer"></div>
            <div className="tabs-menu-container">
              <ul>
                <li>
                  <NavLink to="" end>
                    Detalhes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="candidatos">
                    Candidatos <span>{vagaData.candidates.length}</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="content">
            <div className="vaga-page-info">
              <ul>
                <li>
                  <div className="vaga-page-info-item">
                    <i className="fas fa-calendar-day"></i>
                    <span>{vagaData.date}</span>
                  </div>
                </li>
                <li>
                  <div className="vaga-page-info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{vagaData.location}</span>
                  </div>
                </li>
                <li>
                  <div className="vaga-page-info-item">
                    <i className="fas fa-book-open"></i>
                    <span>{vagaData.course_target}</span>
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
  } else {
    return <Error404 />;
  }
}
