import { useState, createContext, useEffect } from "react";
import { AppOptionsContextType } from "./types";

export const AppOptionsContext = createContext<AppOptionsContextType>(
  {} as AppOptionsContextType
);

export function AppOptionsProvider({ children }: { children: JSX.Element }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sidebarState, setSidebarState] = useState(false);

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 766px)");

    if (mq.matches && localStorage.getItem("toggle-sidemenu") === "yes") {
      setSidebarState(true);
    }
  }, []);
  
  useEffect(() => {
    const botaoHam = document.querySelector(".botao-ham");
    if (sidebarState) {
      document.body.classList.add("toggle-sidemenu");
      botaoHam?.classList.add("active");
      localStorage.setItem("toggle-sidemenu", "yes");
    } else {
      document.body.classList.remove("toggle-sidemenu");
      botaoHam?.classList.remove("active");
      localStorage.setItem("toggle-sidemenu", "");
    }
  });
  function toggleSidebar() {
    setSidebarState(!sidebarState);
  }

  return (
    <AppOptionsContext.Provider
      value={{
        theme,
        setTheme,
        sidebarState,
        toggleSidebar,
      }}
    >
      {children}
    </AppOptionsContext.Provider>
  );
}
