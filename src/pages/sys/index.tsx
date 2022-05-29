import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { Header } from "../../components/header/header";
import { SidebarList } from "../../components/sidebar/sidebar-list";
import { GlobalStyle } from "../../styles/global";
import { SysGlobalStyle } from "../../styles/sys";
import { lightTheme, midnightBlueTheme } from "../../styles/themes";

export default function SystemLayout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);
  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : midnightBlueTheme}>
        <GlobalStyle />
        <SysGlobalStyle />
        <ToastContainer
          position="top-right"
          style={{marginTop: "var(--top-bar-height)"}}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header theme={theme} setTheme={setTheme} />
        <div className="sys-grid-container">
          <SidebarList />
          <div className="main">
            <div className="main-container">
              <main>
                <Outlet />
              </main>
              <footer></footer>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
