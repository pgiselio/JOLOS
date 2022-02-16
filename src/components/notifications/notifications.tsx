import "./notifications.css";

export function Notifications() {
    return (
        <div className="notification-container">
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
                <div className="notification-card">
                    <div className="card-data">
                        <span>Um novo candidato se cadastrou na vaga</span>
                    </div>
                    <div className="card-date">
                        <span>05/02/2022</span>
                    </div>
                    <div className="card-options">
                        <button type="button" className="btn-markasread" title="Marcar como visto"></button>
                    </div>
                </div>
                <div className="notification-card">
                    <div className="card-data">
                        <span>Uma nova mensagem foi recebida no Fórum: </span>
                        <p>Antônio Lima: Aaaaa aaaaaaaa aaaaaa aaaa aaaaa aaaaaaaaaaaaaa
                            aaaaaaaaaaaaaa aa
                            aaaaaaaaaaaaaaa a aaaaaaaaa aaaaaa aaaaaaaaaaaaaaaaaaa . . .</p>
                    </div>
                    <div className="card-date">
                        <span>12/01/2022</span>
                    </div>
                    <div className="card-options">
                        <button type="button" className="btn-markasread" title="Marcar como visto"></button>
                    </div>
                </div>

                <div className="notification-card">
                    <div className="card-data">
                        <span>Vaga cadastrada com sucesso</span>
                    </div>
                    <div className="card-date">
                        <span>11/12/2021</span>
                    </div>
                    <div className="card-options">
                        <button type="button" className="btn-markasread" title="Marcar como visto"></button>
                    </div>
                </div>
            </div>
        </div>
    );
}