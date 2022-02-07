type Item = {
    to: string
    icon: string
    label: string
    title?: string
    className?: string
}

export function SidebarItem(item: Item) {
    return (
        <li>
            <a href={item.to} className={item.className} title={item.title}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
            </a>
        </li>
    );
}
