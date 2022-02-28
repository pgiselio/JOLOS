import { NavLink } from "react-router-dom";

type Item = {
  to: string;
  icon: string;
  label: string;
  title?: string;
  className?: string;
  end?: boolean;
};

export function SidebarItem({ to, icon, label, title, className, end }: Item) {
  function ToggleSidebar() {
    if (!window.matchMedia("(min-width: 766px)").matches) {
      const botaoHam = document.querySelector(".botao-ham");
      document.body.classList.remove("toggle-sidemenu");
      botaoHam?.classList.toggle("active");
      localStorage.setItem("toggle-sidemenu", "");
    }
  }
  return (
    <li>
      <NavLink
        to={to}
        className={className}
        title={title || label}
        end={end}
        onClick={ToggleSidebar}
      >
        <i className={icon}></i>
        <span>{label}</span>
      </NavLink>
    </li>
  );
}
