import { lightTheme } from "./styles/themes";
import { GlobalStyle } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { AppRoutes } from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
