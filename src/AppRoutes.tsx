import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Error404 from "./pages/404";
// import ForumPage from "./pages/sys/forum";
import { HomePage } from "./pages/sys/home/homePage";
// import ProfilePage from "./pages/sys/profile";
import { CriarNovaVagaPage } from "./pages/sys/vagas/criar-nova";
// import VagaPage from "./pages/sys/vagas/[id]";
import { VagaCandidatoPage } from "./pages/sys/vagas/[id]/candidatos";
import { VagaSobrePage } from "./pages/sys/vagas/[id]/sobre";
import { VagasList } from "./pages/sys/vagas";
import { RequireAuth } from "./contexts/AuthContext/RequireAuth";
import LogoutPage from "./pages/logout";
import SettingsPage from "./pages/sys/settings";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/login";
import CadastroPage from "./pages/signup";
import SystemLayout from "./pages/sys";
import ProfilePage from "./pages/sys/profile";
import VagaPage from "./pages/sys/vagas/[id]";

const ForumPage = lazy(() => import("./pages/sys/forum"));

export const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="entrar" element={<LoginPage />} />
          <Route path="cadastro" element={<CadastroPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route
            path="sys"
            element={
              <RequireAuth>
                <SystemLayout />
              </RequireAuth>
            }
          >
            <Route path="*" element={<Error404 />} />
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="vagas" element={<VagasList />} />
            <Route path="vagas/criar" element={<CriarNovaVagaPage />} />
            <Route path="vagas/:id" element={<VagaPage />}>
              <Route path="" element={<VagaSobrePage />} />
              <Route path="candidatos" element={<VagaCandidatoPage />} />
            </Route>
            <Route path="forum" element={<ForumPage />} />
            <Route path="settings/*" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
