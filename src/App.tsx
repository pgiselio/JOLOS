import { AuthProvider } from "./contexts/AuthContext";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes";

import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import ScrollToTop from "./utils/scrollToTop";
function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
