import React from "react";

import { AuthProvider } from "./contexts/AuthContext";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import ScrollToTop from "./utils/scrollToTop";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient";

import "@reach/accordion/styles.css";
import "@reach/dialog/styles.css";
import "./styles/reach-ui.css";
import "react-toastify/dist/ReactToastify.min.css";
import { AppOptionsProvider } from "./contexts/AppOptionsContext";
function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AppOptionsProvider>
              <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
              </BrowserRouter>
            </AppOptionsProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
