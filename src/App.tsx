import {
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import "./styles/App.css";
import { Header } from "./components/header/header";
import { SidebarList } from "./components/sidebar/sidebar-list";
import { LandingPage } from "./pages/Landing/Landing";
import { HomePage } from "./pages/home/homePage";
import { ProfilePage } from "./pages/profile/profilePage";
import { VagasList } from "./pages/vagas/vagasList";
import { CadastroPage } from "./pages/access/signup";
import { LoginPage } from "./pages/access/login";
import { ForumPage } from "./pages/forum";
import { Error404 } from "./pages/404";
import { VagaPage } from "./pages/vagas/vaga/vagaPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="entrar" element={<LoginPage />} />
        <Route path="cadastro" element={<CadastroPage />} />
        <Route path="sys" element={<SystemLayout />}>
          <Route path="*" element={<Error404 />} />
          <Route path="" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="vagas" element={<VagasList />} />
          <Route path="v/:id" element={<VagaPage />}>
            <Route path="candidatos"/>
          </Route>
          <Route path="forum" element={<ForumPage />} />
          <Route path="logout" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

function SystemLayout() {
  document.body.style.background = "#f7f7f7";
  return (
    <>
      <Header />
      <div className="grid-container">
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
    </>
  );
}
export default App;
