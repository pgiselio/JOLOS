import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { ProfilePic } from "../profile-pic/profile-pic";
import { Skeleton } from "../skeleton-load";
import { SidebarItem } from "./sidebar-item";
import { SidebarAside } from "./style";

export function SidebarList() {
  function checkSidebarState() {
    const mq = window.matchMedia("(min-width: 766px)");

    if (mq.matches && localStorage.getItem("toggle-sidemenu") === "yes") {
      document.body.classList.add("toggle-sidemenu");
    }
  }
  checkSidebarState();
  const auth = useAuth();

  const { data } = useQuery(
    ["meUser"],
    async () => {
      const response = await api
        .get(`/usuario/email/${auth?.email}`)
        .catch((error) =>
          error.response.status === 401 || error.response.status === 403
            ? (window.location.href = "/logout")
            : error
        );
      return response?.data;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60, // 1 minute
      refetchInterval: 1000 * 60 * 5, // 5 minutes to refetch automatically
    }
  );
  function nomePessoa(): string {
    if (data?.aluno) {
      return data.aluno.dadosPessoa.nome;
    } else if (data?.empresa) {
      return data.empresa.dadosPessoa.nome;
    } else {
      return "ADMIN";
    }
  }
  return (
    <SidebarAside className="side-bar">
      <div className="side-bar-container">
        <div className="min-perfil">
          <ProfilePic />
          <div className="min-perfil-details">
            <h3 className="min-perfil-name">{nomePessoa()}</h3>
            <span className="min-perfil-detail">{auth?.email}</span>
          </div>
        </div>

        <nav className="sidebar-items">
          <ul>
            <SidebarItem to="" icon="fas fa-home" label="Início" end />
            <SidebarItem to="vagas" icon="fas fa-briefcase" label="Vagas" />
            <SidebarItem to="forum" icon="fas fa-comments" label="Fórum" />
            {nomePessoa() !== "ADMIN" && (
              <SidebarItem to="profile/me" icon="fas fa-user" label="Perfil" />
            )}

            <SidebarItem
              to="settings"
              icon="fas fa-cog"
              label="Configurações"
            />
            <div className="menu-separator"></div>
            <SidebarItem
              to="/logout"
              icon="fas fa-sign-out-alt"
              label="Sair"
              className="sair"
            />
          </ul>
        </nav>
      </div>
    </SidebarAside>
  );
}
