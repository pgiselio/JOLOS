import React from 'react';
import {
  Outlet
} from "react-router-dom";
import "./styles/App.css";
import { Header } from './components/header/header';
import { SidebarList } from './components/sidebar/sidebar-list';
import { HomePage } from './components/pages/home/homePage';

function App() {
  return (
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
