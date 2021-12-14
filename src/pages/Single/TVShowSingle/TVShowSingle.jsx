import {
    Link,
    useLocation
} from "react-router-dom";
import React, { useState, useEffect, useReducer, useRef } from "react" 
import Config from "./../../../api/config" 
import VideoPlayer from "./../../../components/VideoPlayer/VideoPlayer" 
import "./TVShowSingle.css"
const axios = require('axios') 
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const images = {
    poster: "../../images/poster-not-available.jpg"
}

const ACTIONS = {   
    SET_MOVIE_DETAIL: 'movie-detail',
    SET_SEASON_DETAIL: 'season-detail'
}


function reducer(state, action) {
    switch (action.type) { 
        case ACTIONS.SET_MOVIE_DETAIL:
            console.log(action)
            return { 
                ...state,
                movieDetail: action.payload.result
            }
        case ACTIONS.SET_SEASON_DETAIL:
            console.log(action)
            return { 
                ...state,
                seasonDetail: action.payload.result
            }
        default:
            return state
    }
}

const TVShowSingle = () => {
    const [state, dispatch] = useReducer(reducer, { movieDetail: {}, seasonDetail: [], baseURL: "https://image.tmdb.org/t/p/original" })
    
    const [tabMenu, setTabMenu] = useState(1) 
    const [movieGenres, setmovieGenres] = useState([])
    const [runTime, setrunTime] = useState(0) 
    const [player, setPlayer] = useState(false) 
    const [seasonDetail, setSeasonDetail] = useState("") 
    const myRef = useRef(null) 
    const executeScroll = () => scrollToRef(myRef)
    let location = useLocation()
    let tvID = location.pathname.split('/')[2]

    useEffect(() => { 
        // Update the document title using the browser API
        const getMovieDetail = async () => {
            try {
                //  
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${tvID}?api_key=${Config().API}&language=en-US`)
                dispatch({ type: ACTIONS.SET_MOVIE_DETAIL, payload: { result: response.data }})
              
                // setmovieDetail(response.data)
                setmovieGenres(response.data.genres)  
            } catch (error) {
                console.error(error)
            }
        }

        const getSeasonDetail = async () => {
            try{
                // https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}?api_key=<<api_key>>&language=en-US
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${tvID}/season/${tabMenu}?api_key=${Config().API}&language=en-US`)
                dispatch({ type: ACTIONS.SET_SEASON_DETAIL, payload: { result: response.data.episodes }})
            } catch (error) {
                console.log(error)
            }
        }
        getMovieDetail()
        getSeasonDetail()
    }, [tabMenu]);

    // player ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto" 

    const minutesToHours = () => { 
        let Hours = Math.floor(runTime / 60)
        let minutes = runTime % 60
        return `${Hours}h ${minutes}min`
    }

    const releaseDate = () => {
        const date = new Date(state.movieDetail.first_air_date)
        let result = date.toString().split(" ")
        return `${result[1]} ${result[2]}th ${result[3]}`
    } 
 

    const handlePlay = (ids) => {  
        VideoPlayer({ visible: true, data: ids})
        setSeasonDetail(ids)
        setPlayer(!player)   
    }
    
    return (
        <div id="detail-page">
            <VideoPlayer visible={player} data={seasonDetail} />
            <div id="banner">
                <div className="dot3"></div>
                    <img className="banner-img img-with-fb no-js-lNyLSOKMMeUPr1RsL4KcRuIXwHt" src={`https://image.tmdb.org/t/p/original/${state.movieDetail.backdrop_path}`} cached="true" loading="lazy" alt="" />
                <div className="gradient"></div>
            </div> 
            <div className="details-title">
                <img className="poster img-with-fb no-js-rjkmN1dniUHVYAtwuV3Tji7FsDO" src={`https://image.tmdb.org/t/p/w500/${state.movieDetail.poster_path}`} cached="true" loading="lazy" alt={state.movieDetail.original_title} />
                <div className="text">
                    <h1 className="title">{state.movieDetail.original_name}</h1>
                    <div className="info">
                        <div className="video-p-detail">
                            <div className="video-p-name"> 
                                {
                                    movieGenres.map((res) => {
                                        return (
                                            <a className="video-p-genre" href="/movies/genre/878" key={res.id}>{res.name}</a>
                                        )   
                                    })
                                } 
                            </div>
                            <div className="video-p-sub"> 
                                {releaseDate()}
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="button-wrapper">
                            <button title="Play" className="like" onClick={executeScroll}>
                                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"></path></svg>
                                Seasons
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="movie-info">
                <h2>Synopsis</h2>
                <div className="synopsis">
                    { 
                        state.movieDetail.overview !== undefined ? (state.movieDetail.overview) : (
                            <p>...</p>
                        )
                    }
                </div> 
            </div>
            
            <nav className="tabs box-padding mt-25 series-season" id="season">
                <h2>Season</h2>
                <ul> 
                    {
                        [...Array(state.movieDetail.number_of_seasons)].map((e, i) => { 
                                return (  
                                    <span key={i+1} className={ tabMenu === i+1 ? 'tab-link active': 'tab-link'} onClick={() => {setTabMenu(i + 1)}}>{(i+1)}</span>
                                )
                            }
                        )
                    }
                     
                </ul>
            </nav>

            <div className="tvShowsEpisodes box-padding" >
                {
                    state.seasonDetail.map((res) => { 
                        let poster = `${state.baseURL}${res.still_path}`
                        let tvLink = `tv/${state.movieDetail.id}/${res.id}`
                        console.log(res)
                        return (
                            <div className="tvshows-box" key={res.id} onClick={() => { 
                                    handlePlay(`${state.movieDetail.id}|${res.season_number}|${res.episode_number}`)  
                                }}> 
                                <div className="tvshow-img">
                                    <img src={res.still_path !== null ? poster : images.poster }/>
                                    <small className="episode">{res.episode_number}</small>
                                </div> 
                                <div className="episodeDetail">
                                    <h3>{res.name}</h3>
                                    <p>{res.overview}</p>
                                </div> 
                            </div>
                        )
                    })
                } 
            </div>
        </div>
    )
}

export default TVShowSingle