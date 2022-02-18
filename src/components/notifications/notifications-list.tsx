import { NotificationCard } from "./notification-card";
import { StyledNotifications } from "./style";

export function Notifications() {
    return (
        <StyledNotifications className="notification-container">
            <div className="notification-header">
                <div className="title">
                    <h3>Notificações</h3>
                </div>
                <div className="buttons">
                    <button type="button" className="active">Novas</button>
                    <button type="button">Lidas</button>
                </div>
            </div>
            <div className="notification-cards">
                <NotificationCard 
                title="Uma nova mensagem foi recebida no Fórum: " 
                text="Antônio Lima: Aaaaa aaaaaaaa aaaaaa aaaa aaaaa aaaaaaaaaaaaaa
                aaaaaaaaaaaaaa aa
                aaaaaaaaaaaaaaa a aaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaa . . ." 
                date="12/01/2022"/>
                <NotificationCard title="Vaga cadastrada com sucesso" date="11/12/2021"/>
            </div>
        </StyledNotifications>
    );
}