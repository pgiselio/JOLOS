import { useEffect, useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { Outlet, useSearchParams } from "react-router-dom";
import { LoadingPage } from "../../../components/loadingPage";
import { TabSelector } from "../../../components/Tabs/TabSelector";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../services/api";
import { User } from "../../../types/user";
import SettingContaPage from "./conta";
import { SettingPageStyle } from "./styles";

export default function SettingsPage() {
  const [user, setUser] = useState<User>();
  const auth = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useTabs(
    ["security", "profile", "notify", "themes"],
    searchParams.get("tab") || "profile"
  );
  useEffect(() => {
    if (!searchParams.get("tab")) {
      setSearchParams({ tab: "profile" });
    } else {
      setSelectedTab(searchParams.get("tab"));
    }

    async function getUser() {
      const response = await api
        .get(`/usuario/email/${auth?.email}`)
        .catch((error) =>
          error.response.status === 401 || error.response.status === 403
            ? (window.location.href = "/logout")
            : error
        );
      setUser(response?.data);
    }
    getUser();
  }, []);
  if (!user) {
    return <LoadingPage />;
  }

  return (
    <SettingPageStyle>
      <nav className="nav-settings-container">
        <div className="items">
          <h3>Configurações</h3>
          <TabSelector
            isActive={selectedTab === "profile"}
            onClick={() => {
              setSelectedTab("profile");
              setSearchParams({ tab: "profile" });
            }}
            className="tab-selector-profile"
            vertical
          >
            <i className="fas fa-user"></i>
            Perfil
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "security"}
            onClick={() => {
              setSelectedTab("security");
              setSearchParams({ tab: "security" });
            }}
            vertical
          >
            <i className="fas fa-lock"></i>
            Conta e Segurança
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "notify"}
            onClick={() => {
              setSelectedTab("notify");
              setSearchParams({ tab: "notify" });
            }}
            vertical
          >
            <i className="fas fa-bell"></i>
            Notificações
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "themes"}
            onClick={() => {
              setSelectedTab("themes");
              setSearchParams({ tab: "themes" });
            }}
            vertical
          >
            <i className="fas fa-palette"></i>
            Temas
          </TabSelector>
        </div>
      </nav>
      <div className="content-settings">
        {selectedTab === "profile" && (
          <>
            <SettingContaPage />
          </>
        )}
        {selectedTab === "security" && (
            <h2>Segurança</h2>
        )}
        {selectedTab === "notify" && (
            <h2>Notificações</h2>
        )}
        {selectedTab === "themes" && (
            <h2>Temas</h2>
        )}
      </div>
    </SettingPageStyle>
  );
}
