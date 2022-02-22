import { NavLink } from "react-router-dom";

type Item = {
    to: string
    icon: string
    label: string
    title?: string
    className?: string
    end?: boolean;
}

export function SidebarItem({to, icon, label, title, className, end} : Item) {
    return (
        <li>
            <NavLink to={to} className={className} title={title || label} end={end}>
                <i className={icon}></i>
                <span>{label}</span>
            </NavLink>
        </li>
    );
}
