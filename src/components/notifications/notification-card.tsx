type NotifyCard = {
    title : string
    text? : string
    date : string
    link? : string
}

export function NotificationCard(props : NotifyCard){
    return(
        <div className="notification-card">
            <div className="message">
                <span>{props.title}</span>
                {props.text && <p>{props.text}</p>}
            </div>
            <div className="card-date">
                <span>{props.date}</span>
            </div>
            <div className="card-options">
                <button type="button" className="btn-markasread" title="Marcar como visto"></button>
            </div>
        </div>
    );
}