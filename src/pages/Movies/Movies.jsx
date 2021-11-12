import {
    Link, 
} from "react-router-dom";
import React, { useState, useEffect } from "react"
import "./Movies.css"
const axios = require('axios');

const Movies = () => { 
    let isActiveTab = window.sessionStorage.getItem("tab");
    const [tabMenu, setTabMenu] = useState("")
    const [movieList, setMovieList] = useState([])
    const [counter, setCounter] = useState(1)

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        const getMovieList = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4ef0ef4242c8e5901d432415e7a824b9&language=en-US&page=${counter}`)
                setMovieList([...movieList, ...response.data.results])
            } catch (error) {
                console.error(error);
            }
        }
        setTabMenu(window.sessionStorage.getItem("tab"))
        getMovieList()
    }, [counter]);

    const handleLoadMore = (e) => {
        e.preventDefault()
        setCounter(counter + 1)
        console.log(counter)
    }  
    
    console.log(tabMenu)

    return (
        <div id="movies-detail" className="container">
            <h1>Movies</h1>
            <nav className="tabs">
                <ul>
                    <li>
                        <Link to="/movies/popular" className={tabMenu == 'Popular' ? 'tab-link active' : 'tab-link'} onClick={() => { window.sessionStorage.setItem("tab", "Popular") }} >Popular</Link>
                    </li>
                    <li>
                        <Link to="/movies/popular" className={tabMenu == 'Upcoming' ? 'tab-link active' : 'tab-link'} onClick={() => { window.sessionStorage.setItem("tab", "Upcoming") }} >Upcoming</Link>
                    </li>
                    <li>
                        <Link to="/movies/popular" className={tabMenu == 'Genre' ? 'tab-link active' : 'tab-link'} onClick={() => { window.sessionStorage.setItem("tab", "Genre") }}>Genre</Link>
                    </li>
                    <li>
                        <Link to="/movies/popular" className={tabMenu == 'Year' ? 'tab-link active' : 'tab-link'} onClick={() => { window.sessionStorage.setItem("tab", "Year") }}>Year</Link>
                    </li>
                </ul>
            </nav>
            <div className="poster-grid">
                {
                    movieList.map((res) => {
                        // console.log(res)
                        const date = new Date(res.release_date)
                        const poster = `https://image.tmdb.org/t/p/original${res.poster_path}`
                        const movieLink = `movie/${res.id}`
                        return (
                            <div key={res.id}>
                                <Link to={movieLink} className="poster-card" >
                                    <img className="poster img-with-fb no-js-1MJNcPZy46hIy2CmSqOeru0yr5C" src={poster} cached="true" loading="lazy" alt="Poster for Venom: Let There Be Carnage" />
                                    <div className="overlay-text">
                                        <div className="overlay-text-rating">HD</div>
                                    </div>
                                    <p className="title">{res.original_title}</p>
                                    <div className="meta">
                                        {date.getFullYear()} <i className="dot"></i> {res.vote_average}
                                        <i className="type">Movie</i>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Movies