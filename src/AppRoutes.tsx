import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ModalRouter } from "./components/modal-router";
import { RequireAuth } from "./contexts/AuthContext/RequireAuth";

//Pages
import Error404 from "./pages/404";
import { HomePage } from "./pages/sys/home/homePage";
import CriarNovaVagaPage from "./pages/sys/vagas/criar-nova";
import { VagaCandidatoPage } from "./pages/sys/vagas/[id]/candidatos";
import { VagaSobrePage } from "./pages/sys/vagas/[id]/sobre";
import { VagasList } from "./pages/sys/vagas";
import LogoutPage from "./pages/logout";
import SettingsPage from "./pages/sys/settings";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/entrar";
import CadastroPage from "./pages/cadastro";
import VagaPage from "./pages/sys/vagas/[id]";
import { CriarNovaVagaForm } from "./pages/sys/vagas/criar-nova/_form";
import { CadastroLayout } from "./pages/cadastro/layout";
import { LoadingPage } from "./components/loadingPage";
import { LoadingPageLogo } from "./components/loadingPage/logo";
import SettingContaPage from "./pages/sys/settings/conta";
import DownloadCurriculoPage from "./pages/sys/download/curriculo/[id]";
import { VerifiqueOSeuEmailPage } from "./pages/cadastro/verifique-seu-email";

const ForumPage = lazy(() => import("./pages/sys/forum"));
const ProfilePage = lazy(() => import("./pages/sys/profile/[id]"));
const SystemLayout = lazy(() => import("./pages/sys"));

export const AppRoutes = () => {
  let location = useLocation();
  let state = location.state as { modalLocation?: Location };

  return (
    <>
      <Routes location={state?.modalLocation || location}>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="entrar" element={<LoginPage />} />
        <Route path="cadastro" element={<CadastroLayout />}>
          <Route index element={<CadastroPage />} />
          <Route path="confirmacao" element={<VerifiqueOSeuEmailPage/>}/>
        </Route>
        <Route path="logout" element={<LogoutPage />} />
        <Route
          path="download/curriculo/:id"
          element={<DownloadCurriculoPage />}
        />
        <Route
          path="sys"
          element={
            <RequireAuth>
              <Suspense fallback={<LoadingPageLogo />}>
                <SystemLayout />
              </Suspense>
            </RequireAuth>
          }
        >
          <Route path="*" element={<Error404 />} />
          <Route index element={<HomePage />} />
          <Route
            path="profile/:id"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ProfilePage />
              </Suspense>
            }
          />
          <Route path="vagas" element={<VagasList />} />
          <Route path="vagas/criar" element={<CriarNovaVagaPage />} />
          <Route path="vagas/:id" element={<VagaPage />}>
            <Route path="" element={<VagaSobrePage />} />
            <Route path="candidatos" element={<VagaCandidatoPage />} />
          </Route>
          <Route
            path="forum"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ForumPage />
              </Suspense>
            }
          />
          <Route path="settings" element={<SettingsPage />}>
            <Route path="conta" element={<SettingContaPage />} />
          </Route>
        </Route>
      </Routes>
      {state?.modalLocation && (
        <ModalRouter title="Criar nova vaga" toForm="form-create-vaga">
          <CriarNovaVagaForm />
        </ModalRouter>
      )}
    </>
  );
};
