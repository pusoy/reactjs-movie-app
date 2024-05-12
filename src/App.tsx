import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./App.css";
import Sidebar from "@/components/Common/Sidebar/Sidebar";
import Header from "@/components/Common/Header/Header";
import Error404 from "./components/Error/404";

import {
  Home,
  Single,
  TVShowSingle,
  SearchDetail,
  Movies,
  TVShows,
} from "./pages/index";
import { MouseEvent } from "react";

function App() {
  const handleClickApp = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    let sidebar = document.getElementById("sidebar");
    let overlay = document.getElementById("overlay");

    if (sidebar) {
      sidebar.classList.remove("open");
      sidebar.classList.add("closed");
    }
    if (overlay) {
      overlay.classList.remove("open");
      overlay.classList.add("closed");
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div id="overlay" className="closed" onClick={handleClickApp}></div>
        <Sidebar></Sidebar>
        <div id="main-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Single />} />
            <Route path="/search" element={<SearchDetail />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/tv/:id" element={<TVShowSingle />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
