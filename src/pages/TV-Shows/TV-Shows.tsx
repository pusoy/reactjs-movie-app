import { Link } from "react-router-dom";
import { useState } from "react";
import "./TV-Shows.css";
import { Popular } from "./Popular";

const TVShows = () => {
  const [tabMenu, setTabMenu] = useState("popular");

  return (
    <div id="movies-detail" className="container">
      <h1>Browse TV-Shows</h1>
      <nav className="tabs">
        <ul>
          <li>
            <Link
              to="/movies"
              className={tabMenu == "popular" ? "tab-link active" : "tab-link"}
              onClick={() => {
                setTabMenu("popular");
              }}
            >
              Popular
            </Link>
          </li>
          {/* <li>
                        <Link to="/movies" className={tabMenu == 'upcoming' ? 'tab-link active' : 'tab-link'} onClick={() => {setTabMenu('upcoming')}} >Upcoming</Link>
                    </li>
                    <li>
                        <Link to="/movies" className={tabMenu == 'top_rated' ? 'tab-link active' : 'tab-link'} onClick={() => {setTabMenu('top_rated')}} >Top Rated</Link>
                    </li>
                    <li>
                        <Link to="/movies" className={tabMenu == 'genre' ? 'tab-link active' : 'tab-link'} onClick={() => {setTabMenu('genre')}}>Genre</Link>
                    </li> */}
        </ul>
      </nav>
      {tabMenu === "popular" ? <Popular /> : <h2>Year</h2>}
    </div>
  );
};

export default TVShows;
