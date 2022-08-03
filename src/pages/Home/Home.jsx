import {
    Link
} from "react-router-dom";
import React, { useState, useEffect } from "react"
import "./Home.css"
import Config from "./../../api/config"
import Banner from './../../components/Banner/Banner' 
const axios = require('axios');

let inlineStyle = {
    banner: [{
        color: 'var(--danger)'
    }]
}
const Home = () => {
    const [movieList, setMovieList] = useState([])
    const [counter, setCounter] = useState(1)

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        const getMovieList = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${Config().API}&language=en-US&page=${counter}`)
                setMovieList([...movieList, ...response.data.results])
            } catch (error) {
                console.error(error);
            }
        }
        getMovieList()
    }, [counter]);

    window.scrollTo(0, document.body.scrollHeight);
    
    
    const handleLoadMore = (e) => {
        e.preventDefault()
        setCounter(counter + 1)
        console.log(counter)
    }
      

    return (
        <div id="homepage" className="container">
            <div className="home">Home</div>
            <section>
                
                <div className="main-blogs">
                    <div className="main-blog anim">
                        <div className="main-blog__title">
                            SELECT person FROM world WHERE someone LIKE '%<i className="text-danger">you</i>%';
                        </div>
                        <div className="main-blog__author">
                            <div className="author-detail">
                                <div className="author-name">Support Me.
                                </div>
                                <div className="author-info donate">
                                    <a href="tel:09664505714">Gcash</a>
                                    <span className="seperate"></span>
                                    <a href="https://www.paypal.me/JaffyMaglinte" target="_blank">Paypal</a>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
                {/* <Banner /> */}
                <h2>Now playing movies</h2> 
                <div className="poster-grid">
                    {
                        movieList.map((res) => {
                            // console.log(res)
                            const date = new Date(res.release_date)
                            const poster = `https://image.tmdb.org/t/p/original${ res.poster_path }`
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
                <div className="more"><h6 onClick={handleLoadMore}>... Load More ...</h6></div>
            </section>
        </div>
    )
}

export default Home