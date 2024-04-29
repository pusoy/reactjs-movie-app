import { useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Search.css";
import noPoster from "./../../assets/img/poster-holder.jpg";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import TMDB_Config from "../../database/TMDB_Config";

const SearchDetail = () => {
  const [searchData, setsearchData] = useState({});
  const [searchResult, setsearchResult] = useState([]);
  const [counter, setCounter] = useState(1);
  const { ref, inView } = useInView();

  let location = useLocation();
  let query = location.search.replace("?", "");
  let searchString = location.search.split("=")[1];

  useEffect(() => {
    // Update the document title using the browser API
    const getSearch = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_Config.API}&${query}&page=${counter}`
        );
        setsearchData(response.data);
        counter === 1
          ? setsearchResult(response.data.results)
          : setsearchResult([...searchResult, ...response.data.results]);
      } catch (error) {
        console.error(error);
      }
    };
    getSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  useEffect(() => {
    if (inView) setCounter((prev) => prev + 1);
  }, [inView]);

  if (Object.keys(searchResult).length === 0) {
    return (
      <div id="searchpage" className="container">
        <p>
          Looks like something went wrong :(<br></br>
        </p>
      </div>
    );
  }

  return (
    <div id="searchpage" className="container">
      <p className="info">
        Page {searchData.page} of {searchData.total_pages}. Showing{" "}
        {Object.keys(searchResult).length} results of {searchData.total_results}
      </p>
      <section>
        <h1>Search results for: {searchString.replace(/%20/g, " ")}</h1>
        <div className="poster-grid">
          {searchResult.map((res) => {
            let date, title, posterLink;
            date =
              res.release_date !== undefined
                ? (date = new Date(res.release_date))
                : res.first_air_date !== undefined
                ? new Date(res.first_air_date)
                : "---";
            title =
              res.name !== undefined
                ? res.name
                : res.title !== undefined
                ? res.title
                : res.original_title !== undefined
                ? res.original_title
                : res.original_name !== undefined
                ? res.original_name
                : res.known_for[0] > 0
                ? res.known_for[0].original_title
                : res.name;
            posterLink =
              res.poster_path === null
                ? noPoster
                : res.poster_path !== undefined
                ? `https://image.tmdb.org/t/p/original${res.poster_path}`
                : noPoster;

            const posterAlt = `Poster for ${res.original_name}`;
            const movieLink =
              res.media_type === "tv" ? `tv/${res.id}` : `movie/${res.id}`;

            return (
              <div key={res.id}>
                <Link to={movieLink} className="poster-card">
                  <img
                    className="poster img-with-fb no-js-1MJNcPZy46hIy2CmSqOeru0yr5C"
                    src={posterLink}
                    cached="true"
                    loading="lazy"
                    alt={posterAlt}
                  />
                  <div className="overlay-text">
                    <div className="overlay-text-rating">HD</div>
                  </div>
                  <p className="title">{title}</p>
                  <div className="meta">
                    {date === "---"
                      ? "---"
                      : isNaN(date.getFullYear())
                      ? "----"
                      : date.getFullYear()}
                    <i className="dot"></i>
                    {res.vote_average !== undefined ? res.vote_average : 0}
                    <i className="type">Movie</i>
                  </div>
                </Link>
              </div>
            );
          })}
          <span ref={ref} />
        </div>
      </section>
    </div>
  );
};

export { SearchDetail };
