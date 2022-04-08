import { AuthProvider } from "./contexts/AuthContext";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes";

import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import ScrollToTop from "./utils/scrollToTop";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient";
import { UserProvider } from "./contexts/UserContext";
function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
              </BrowserRouter>
            </UserProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
