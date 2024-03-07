import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Genre.css";
import Config from "./../../../api/config";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const IMAGES = [
  { src: "images/hi.gif" },
  { src: "images/haha.gif" },
  { src: "images/wew.gif" },
  { src: "images/happy.gif" },
  { src: "images/eating.gif" },
];

const ACTIONS = {
  GENRE: "genre",
  POPULAR: "popular",
  INCREMENT: "increment",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.GENRE:
      return {
        genreList: action.payload.result,
        popularList: state.popularList,
        count: state.count,
      };
    case ACTIONS.POPULAR:
      return {
        genreList: state.genreList,
        popularList: action.payload.result,
        count: state.count,
      };
    case ACTIONS.INCREMENT:
      return {
        genreList: state.genreList,
        popularList: state.popularList,
        count: state.count + 1,
      };
    default:
      return state;
  }
}

const Genre = () => {
  const [state, dispatch] = useReducer(reducer, {
    genreList: [],
    popularList: [],
    count: 1,
  });
  const [genre, setGenre] = useState("");
  const { ref, inView } = useInView();

  useEffect(() => {
    const getGenreList = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${
            Config().API
          }&language=en-US`
        );
        dispatch({
          type: ACTIONS.GENRE,
          payload: { result: response.data.genres },
        });
      } catch (error) {
        console.error(error);
      }
    };

    const getMovieList = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            Config().API
          }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genre}&page=${
            state.count
          }`
        );
        dispatch({
          type: ACTIONS.POPULAR,
          payload: {
            result:
              state.count == 1
                ? response.data.results
                : [...state.popularList, ...response.data.results],
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    getMovieList();
    getGenreList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.count]);

  useEffect(() => {
    const getGenreList = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${
            Config().API
          }&language=en-US`
        );
        dispatch({
          type: ACTIONS.GENRE,
          payload: { result: response.data.genres },
        });
      } catch (error) {
        console.error(error);
      }
    };
    getGenreList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  useEffect(() => {
    if (inView) dispatch({ type: ACTIONS.INCREMENT });
  }, [inView]);

  return (
    <>
      <div className="genre-detail">
        {state.genreList.map((res) => {
          let genreLink = `/movies`;
          return (
            <Link
              className={
                genre == res.id ? `genre-box is-genre-active` : `genre-box`
              }
              to={genreLink}
              key={res.id}
              onClick={() => {
                setGenre(res.id);
              }}
            >
              {res.name}
            </Link>
          );
        })}
      </div>
      {genre != "" ? (
        <div id="popular-detail">
          <div className="poster-grid">
            {state.popularList.map((res) => {
              // console.log(res)
              const date = new Date(res.release_date);
              const poster = `https://image.tmdb.org/t/p/original${res.poster_path}`;
              const movieLink = `movie/${res.id}`;
              return (
                <div key={res.id}>
                  <Link to={movieLink} className="poster-card">
                    <img
                      className="poster img-with-fb no-js-1MJNcPZy46hIy2CmSqOeru0yr5C"
                      src={poster}
                      cached="true"
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
        </div>
      ) : (
        <div className="genre-banner">
          {IMAGES.map((image) => {
            return <img src={image.src} />;
          })}
        </div>
      )}
    </>
  );
};

export default Genre;
