import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LandingPage } from './components/Landing/Landing';
import { HomePage } from './components/pages/home/homePage';
import { ProfilePage } from './components/pages/profile/profilePage';
import { VagasPage } from './components/pages/vagas/vagasPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sys" element={<App />}>
          <Route path="" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="vagas" element={<VagasPage />} />
          <Route path="forum" element={<HomePage />} />
          <Route path="logout" element={<HomePage />} />
        </Route>

      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
