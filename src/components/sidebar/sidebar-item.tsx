import { NavLink } from "react-router-dom";

type Item = {
    to: string
    icon: string
    label: string
    title?: string
    className?: string
    end?: boolean;
}

export function SidebarItem(item: Item) {
    return (
        <li>
            <NavLink to={item.to} className={item.className} title={item.title || item.label} end={item.end}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
            </NavLink>
        </li>
    );
}
