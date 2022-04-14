import { useEffect } from "react";
import { useTabs } from "react-headless-tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingPage } from "../../../components/loadingPage";
import { TabSelector } from "../../../components/Tabs/TabSelector";
import { useUser } from "../../../hooks/useUser";
import SettingContaPage from "./conta";
import { SettingPageStyle } from "./styles";

export default function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useTabs(
    ["security", "profile", "notifications", "themes"],
    searchParams.get("tab") || "profile"
  );
  let navigate = useNavigate();
  const user = useUser();
  const mq = window.matchMedia("(min-width: 1000px)");
  useEffect(() => {
    if (!searchParams.get("tab") && mq.matches) {
      setSearchParams({ tab: "profile" });
    } else {
      setSelectedTab(searchParams.get("tab"));
    }
  });
  if (user.loadingData) {
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
              setSearchParams({ tab: "security" });
            }}
            vertical
          >
            <i className="fas fa-lock"></i>
            Conta e Segurança
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "notifications"}
            onClick={() => {
              setSearchParams({ tab: "notifications" });
            }}
            vertical
          >
            <i className="fas fa-bell"></i>
            Notificações
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "themes"}
            onClick={() => {
              setSearchParams({ tab: "themes" });
            }}
            vertical
          >
            <i className="fas fa-palette"></i>
            Temas
          </TabSelector>
        </div>
      </nav>
      <div className={`content-settings ${selectedTab ? "active" : ""}`}>
        {selectedTab && (
          <div className="setting">
            {!mq.matches && (
              <button type="button" onClick={() => navigate(-1)}>
                Voltar
              </button>
            )}
            {selectedTab === "profile" && (
              <>
                <h3>Configurações de conta</h3>
                <SettingContaPage />
              </>
            )}
            {selectedTab === "security" && <h3>Segurança</h3>}
            {selectedTab === "notifications" && <h3>Notificações</h3>}
            {selectedTab === "themes" && <h3>Temas</h3>}
          </div>
        )}
      </div>
    </SettingPageStyle>
  );
}
