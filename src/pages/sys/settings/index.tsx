import { useEffect } from "react";
import { useTabs } from "react-headless-tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingPage } from "../../../components/loadingPage";
import { OutsetHeadersCornerRadius } from "../../../components/outset-radius-to-headers";
import { TabSelector } from "../../../components/Tabs/TabSelector";
import { useAuth } from "../../../hooks/useAuth";
import SettingContaPage from "./conta";
import { SettingPageStyle } from "./styles";

export default function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useTabs(
    ["security", "profile", "notifications", "themes"],
    searchParams.get("tab") || "profile"
  );
  let navigate = useNavigate();
  const auth = useAuth();
  const mq = window.matchMedia("(min-width: 1000px)");
  useEffect(() => {
    if (!searchParams.get("tab") && mq.matches) {
      setSearchParams({ tab: "profile" });
    } else {
      setSelectedTab(searchParams.get("tab"));
    }
  });
  if (!auth.userInfo?.id) {
    return <LoadingPage />;
  }

  return (
    <SettingPageStyle>
      <nav className={`nav-settings-container ${selectedTab ? "toggle" : ""}`}>
        <div className="nav">
          <OutsetHeadersCornerRadius className="rounded-corner">
            <div className="header">
              <h3>Configurações</h3>
            </div>
          </OutsetHeadersCornerRadius>
          <div className="items">
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
        </div>
      </nav>
      <div className={`setting-container ${selectedTab ? "active" : ""}`}>
        {selectedTab && (
          <div className="setting">
            <OutsetHeadersCornerRadius className="rounded-corner">
              <div className="header">
                {!mq.matches && (
                  <button
                    className="back-button"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>
                )}
                {selectedTab === "profile" && <h3>Perfil</h3>}
                {selectedTab === "security" && <h3>Conta e Segurança</h3>}
                {selectedTab === "notifications" && <h3>Notificações</h3>}
                {selectedTab === "themes" && <h3>Temas</h3>}
              </div>
            </OutsetHeadersCornerRadius>
            <div className="content">
              {selectedTab === "profile" && <SettingContaPage />}
              {selectedTab === "security" && <div>conteudo aqui</div>}
              {selectedTab === "notifications" && <div>Notificações</div>}
              {selectedTab === "themes" && <div>Temas</div>}
            </div>
          </div>
        )}
      </div>
    </SettingPageStyle>
  );
}
