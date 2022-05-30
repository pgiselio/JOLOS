import { useTabs } from "react-headless-tabs";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import CircularProgressFluent from "../circular-progress-fluent";
import { NotificationCard } from "./notification-card";
import { StyledNotifications } from "./style";
type notification = {
  id: number;
  titulo: string;
  descricao: string;
  vizualizado: boolean;
  data: Date;
  usuario: {
    id: number;
    email: string;
  };
};

export function Notifications() {
  const auth = useAuth();
  const [selectedTab, setSelectedTab] = useTabs(["new", "read"]);
  const { data } = useQuery(
    "notifications-new",
    async () => {
      const response = await api.get<notification[]>(
        `/notificacao/usuario/${auth.email}`
      );
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute to refetch
      refetchInterval: 1000 * 60, // 1 minutes to refetch
    }
  );
  const { data: notificationsDataRead } = useQuery(
    "notifications-read",
    async () => {
      const response = await api.get<notification[]>(
        `/notificacao/usuario/${auth.email}/visualizadas`
      );
      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute to refetch
      refetchInterval: 1000 * 60, // 1 minutes to refetch
    }
  );
  function formatDate(date: Date) {
    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
  }
  return (
    <StyledNotifications className="notification-container">
      <div className="notification-header">
        <div className="title">
          <h3>Notificações</h3>
        </div>
        <div className="buttons">
          <button
            type="button"
            onClick={() => setSelectedTab("new")}
            className={selectedTab === "new" ? "active" : ""}
          >
            Novas
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab("read")}
            className={selectedTab === "read" ? "active" : ""}
          >
            Lidas
          </button>
        </div>
      </div>
      <div className="notification-cards">
        {selectedTab === "new" &&
          (data ? (
            data.length === 0 ? (
              <div className="notification-card no-notifications">
                No momento você não tem notificações novas!
              </div>
            ) : (
              data.map((notification: notification) => {
                if (!notification.vizualizado) {
                  return (
                    <NotificationCard
                      title={notification.titulo}
                      text={notification.descricao}
                      date={
                        new Date(notification.data) + " | " + notification.data
                      }
                    />
                  );
                }
                return null;
              })
            )
          ) : (
            <p
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                paddingTop: "30px",
              }}
            >
              <CircularProgressFluent
                color="var(--accent-color)"
                height="30px"
                width="30px"
                duration=".9s"
              />
              Carregando...
            </p>
          ))}

        {selectedTab === "read" &&
          (notificationsDataRead ? (
            notificationsDataRead.length === 0 ? (
              <div className="notification-card no-notifications">
                Sem notificações lidas!
              </div>
            ) : (
              notificationsDataRead.map((notification: notification) => {
                if (!notification.vizualizado) {
                  return (
                    <NotificationCard
                      title={notification.titulo}
                      text={notification.descricao}
                      date={
                        new Date(notification.data) + " | " + notification.data
                      }
                    />
                  );
                }
                return null;
              })
            )
          ) : (
            <p
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                paddingTop: "30px",
              }}
            >
              <CircularProgressFluent
                color="var(--accent-color)"
                height="30px"
                width="30px"
                duration=".9s"
              />
              Carregando...
            </p>
          ))}
      </div>
    </StyledNotifications>
  );
}
