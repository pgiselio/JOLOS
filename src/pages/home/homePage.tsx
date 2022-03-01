import { Notifications } from "../../components/notifications/notifications-list";
import { OutsetHeadersCornerRadius } from "../../components/outset-radius-to-headers";

export function HomePage() {
    return (
        <>
            <div className="content">
                <Notifications/>
            </div>
        </>
    );
}