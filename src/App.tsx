import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import "./styles/App.css";
import { Header } from './components/header/header';
import { SidebarList } from './components/sidebar/sidebar-list';
import { LandingPage } from './pages/Landing/Landing';
import { HomePage } from './pages/home/homePage';
import { ProfilePage } from './pages/profile/profilePage';
import { VagasPage } from './pages/vagas/vagasPage';
import { CadastroPage } from './pages/cadastro/signup';
import { LoginPage } from './pages/login/login';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<CadastroPage />} />
        <Route path="sys" element={<SystemLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="vagas" element={<VagasPage />} />
          <Route path="forum" element={<HomePage />} />
          <Route path="logout" element={<HomePage />} />
        </Route>

      </Routes>
    </Router>
    </>
  );
}

function SystemLayout(){
  return(
    <>
      <Header />
      <div className="grid-container">
        <SidebarList />
        <div className="main">
          <div className="main-container">
            <main>
              <Outlet/>
            </main>
            <footer>

            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
