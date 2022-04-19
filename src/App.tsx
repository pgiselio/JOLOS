import React from 'react';

import { AuthProvider } from "./contexts/AuthContext";

import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/themes";
import "@reach/accordion/styles.css";
import "./styles/reach-ui.css";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import ScrollToTop from "./utils/scrollToTop";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient";
function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
              </BrowserRouter>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
