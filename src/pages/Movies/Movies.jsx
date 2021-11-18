import {
    Link, 
} from "react-router-dom";
import React, { useState } from "react"
import "./Movies.css"
import Config from "./../../api/config"
import Popular from "./Popular/Popular"
import Upcoming from "./Upcoming/Upcoming"
import TopRated from "./Top/Top"
import Genre from "./Genre/Genre"
const axios = require('axios');

const Movies = () => {
    const [tabMenu, setTabMenu] = useState("popular") 

    return (
        <div id="movies-detail" className="container">
            <h1>Movies</h1>
            <nav className="tabs">
                <ul>
                    <li>
                        <Link to="/movies" className={tabMenu == 'popular' ? 'tab-link active' : 'tab-link'} onClick={() => {setTabMenu('popular')}} >Popular</Link>
                    </li>
                    <li>
                        <Link to="/movies" className={tabMenu == 'upcoming' ? 'tab-link active' : 'tab-link'} onClick={() => {setTabMenu('upcoming')}} >Upcoming</Link>
                    </li>
                    <li>
                        <Link to="/movies" className={tabMenu == 'top_rated' ? 'tab-link active' : 'tab-link'} onClick={() => {setTabMenu('top_rated')}} >Top Rated</Link>
                    </li>
                    <li>
                        <Link to="/movies" className={tabMenu == 'genre' ? 'tab-link active' : 'tab-link'} onClick={() => {setTabMenu('genre')}}>Genre</Link>
                    </li>
                    {/* <li>
                        <Link to="/movies" className={tabMenu == 'year' ? 'tab-link active' : 'tab-link'} onClick={() => {setTabMenu('year')}}>Year</Link>
                    </li> */}
                </ul>
            </nav>
            {
                tabMenu == 'popular' ? (
                    <Popular/> 
                ) : tabMenu == 'top_rated' ? (
                    <TopRated/>
                ) : tabMenu == 'upcoming' ? (
                    <Upcoming/>
                ) : tabMenu == 'genre' ? (
                    <Genre/>
                ) : (
                    <h2>Year</h2>
                )
            }
            
        </div>
    )
}

export default Movies