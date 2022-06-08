import { HTMLAttributes } from "react";

interface NotifyCard extends HTMLAttributes<HTMLDivElement> {
  titulo: string;
  detalhes?: string;
  date: string;
  link?: string;
  read?: boolean;
}

export function NotificationCard({
  titulo,
  detalhes,
  date,
  link,
  read,
  ...rest
}: NotifyCard) {
  return (
    <div className="notification-card" {...read && {"data-read": true}} {...rest}>
      <div className="message">
        <span>{titulo}</span>
        {detalhes && <p>{detalhes}</p>}
      </div>
      <div className="card-date">
        <span>{date}</span>
      </div>
      <div className="card-options">
        <button
          type="button"
          className="btn-markasread"
          title="Marcar como visto"
        ></button>
      </div>
    </div>
  );
}
