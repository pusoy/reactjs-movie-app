import {
    Link, 
} from "react-router-dom";
import React, { useState, useEffect } from "react"
import "./Movies.css"
import Config from "./../../config"
const axios = require('axios');

const Movies = () => {
    const [tabMenu, setTabMenu] = useState("popular")
    const [movieListPopular, setMovieListPopular] = useState([])
    const [movieListUpcoming, setMovieListUpcoming] = useState([])
    const [counterPopular, setCounterPopular] = useState(1)
    const [counterUpcoming, setCounterUpcoming] = useState(1)

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        const getMovieList = async () => {
                try {
                    if(tabMenu == 'popular' || tabMenu == 'upcoming') {
                        const response = await axios.get(`https://api.themoviedb.org/3/movie/${tabMenu != '' ? tabMenu : 'popular'}?api_key=${Config().API}&language=en-US&page=${tabMenu == 'popular' ? counterPopular : counterUpcoming}`)
                        tabMenu == 'popular' ? (
                            counterPopular == 1 ? setMovieListPopular(response.data.results) : setMovieListPopular([...movieListPopular, ...response.data.results])
                        ) : (
                            counterUpcoming == 1 ? setMovieListUpcoming(response.data.results) : setMovieListUpcoming([...movieListUpcoming, ...response.data.results])
                        )
                    } 
                } catch (error) {
                    console.error(error);
                }
            
        }
        getMovieList()
    }, [tabMenu, counterPopular, counterUpcoming]);
  
    function handleClickTab(str) {
        setTabMenu(str)
    }

    const handleLoadMorePopular = (e) => {
        e.preventDefault()
        setCounterPopular(counterPopular + 1)
        console.log(counterPopular)
    }

    const handleLoadMoreUpcoming = (e) => {
        e.preventDefault()
        setCounterUpcoming(counterUpcoming + 1)
        console.log(counterUpcoming)
    }

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
                        <Link to="/movies" className={tabMenu == 'genre' ? 'tab-link active' : 'tab-link'} onClick={() => {setTabMenu('genre')}}>Genre</Link>
                    </li>
                    <li>
                        <Link to="/movies" className={tabMenu == 'year' ? 'tab-link active' : 'tab-link'} onClick={() => {setTabMenu('year')}}>Year</Link>
                    </li>
                </ul>
            </nav>
            {
                tabMenu == 'popular' ? (
                    <div>
                        <div className="poster-grid">
                            {
                                movieListPopular.map((res) => {
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
                        <div className="more"><h6 onClick={handleLoadMorePopular}>... Load More ...</h6></div>
                    </div>
                ) : tabMenu == 'upcoming' ? (
                    <div>
                        <div className="poster-grid">
                            {
                                movieListUpcoming.map((res) => {
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
                        <div className="more"><h6 onClick={handleLoadMoreUpcoming}>... Load More ...</h6></div>
                    </div>
                ) : tabMenu == 'genre' ? (
                    <h2>Genre</h2>
                ) : (
                    <h2>Year</h2>
                )
            }
            
        </div>
    )
}

export default Movies