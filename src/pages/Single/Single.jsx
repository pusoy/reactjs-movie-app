import {
    useLocation
} from "react-router-dom";
import React, { useState, useEffect } from "react"
import "./Single.css"
const axios = require('axios')

const Single = () => {
    const [movieDetail, setmovieDetail] = useState({})
    const [movieGenres, setmovieGenres] = useState([])
    const [runTime, setrunTime] = useState(0)
    const [videos, setVideos] = useState([])
    let location = useLocation();
    useEffect(() => { 
        // Update the document title using the browser API
        const getMovieDetail = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3${location.pathname}?api_key=d0e6107be30f2a3cb0a34ad2a90ceb6f&append_to_response=videos,credits,recommendations`)
                setmovieDetail(response.data)
                setmovieGenres(response.data.genres)
                setrunTime(response.data.runtime)
                setVideos(response.data.videos.results)
            } catch (error) {
                console.error(error)
            }
        }
        performance.navigation.type === 1 ? getMovieDetail() : getMovieDetail() 
    }, []);
     
    const minutesToHours = () => { 
        let Hours = Math.floor(runTime / 60)
        let minutes = runTime % 60
        return `${Hours}h ${minutes}min`
    }

    const releaseDate = () => {
        const date = new Date(movieDetail.release_date)
        let result = date.toString().split(" ")
        return `${result[1]} ${result[2]}th ${result[3]}`
    } 

    const handlePlay = (e) => { 
        e.preventDefault()
        // window.open(`https://www.2embed.ru/embed/tmdb/movie?id=${movieDetail.id}`, "_blank")
        window.location.replace(`https://www.2embed.ru/embed/tmdb/movie?id=${movieDetail.id}`)
    }
 
    const youtubeVideo = videos.find(yt => {
        return yt.name === 'Eternals'
    });
    
    console.log(movieDetail)
    return (
        <div id="detail-page">
            <div id="banner">
                <div className="dot3"></div>
                <img className="banner-img img-with-fb no-js-lNyLSOKMMeUPr1RsL4KcRuIXwHt" src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`} cached="true" loading="lazy" alt="" />
                <div className="gradient"></div>
            </div> 
            <div className="details-title">
                <img className="poster img-with-fb no-js-rjkmN1dniUHVYAtwuV3Tji7FsDO" src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`} cached="true" loading="lazy" alt={movieDetail.original_title} />
                <div className="text">
                    <h1 className="title">{movieDetail.original_title}</h1>
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
                                
                                {minutesToHours()}
                                <span> • </span>
                                {releaseDate()}
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="button-wrapper">
                            <button title="Play" className="like" onClick={handlePlay}>
                                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"></path></svg>
                                Play
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movie-info">
                <h2>Synopsis</h2>
                <div className="synopsis">
                    {movieDetail.overview}
                </div>
                {/* <h2>Trailers</h2>
                <div className="outer-div"> 
                    <div className="embed-container">
                          
                        <iframe src="https://www.youtube.com/embed/XK-MIqHz5tU" frameBorder="0" allowFullScreen=""></iframe>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Single