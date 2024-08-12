import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";
import TMDB_Config from "../../database/TMDB_Config";
import { useInView } from "react-intersection-observer";
import axios from "axios";

export const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [counter, setCounter] = useState(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_Config.API}&language=en-US&page=${counter}`
        );
        // @ts-ignore
        setMovieList((prev) => [...prev, ...response.data.results]);
      } catch (error) {
        console.error(error);
      }
    };

    getMovieList();
  }, [counter]);

  useEffect(() => {
    if (inView) {
      setCounter((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <div id="homepage" className="container">
      <div className="home">Home</div>
      <section>
        <div className="main-blogs">
          <div className="main-blog anim">
            <div className="main-blog__title">
              SELECT person FROM world WHERE someone LIKE '%
              <i className="text-danger">you</i>%';
              <h6 className="recommend">
                Recommended browser:{" "}
                <a href="https://brave.com/" target="_blank" rel="noreferrer">
                  Brave
                </a>
              </h6>
            </div>

            <div className="main-blog__author">
              <div className="author-detail">
                <div className="author-name">Support Me.</div>
                <div className="author-info donate">
                  <a href="tel:09673643071">Gcash</a>
                  <span className="seperate"></span>
                  {/* <a href="https://www.paypal.me/JaffyMaglinte" target="_blank">Paypal</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Banner /> */}
        <h2>Now playing movies</h2>
        <div className="poster-grid">
          {movieList.map((res: any, index) => {
            const date = new Date(res.release_date);
            const poster = `https://image.tmdb.org/t/p/original${res.poster_path}`;
            const movieLink = `movie/${res.id}`;
            return (
              <div key={`id-${index}`}>
                <Link to={movieLink} className="poster-card">
                  <img
                    className="poster img-with-fb no-js-1MJNcPZy46hIy2CmSqOeru0yr5C"
                    src={poster}
                    loading="lazy"
                    alt="Poster for Venom: Let There Be Carnage"
                  />
                  <div className="overlay-text">
                    <div className="overlay-text-rating">HD</div>
                  </div>
                  <p className="title">{res.original_title}</p>
                  <div className="meta">
                    {date.getFullYear()} <i className="dot"></i>{" "}
                    {res.vote_average}
                    <i className="type">Movie</i>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <span ref={ref} />
      </section>
    </div>
  );
};
