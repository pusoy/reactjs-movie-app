import { useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Genre.css";
import TMDB_Config from "../../../database/TMDB_Config";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const ACTIONS = {
  GENRE: "genre",
  POPULAR: "popular",
  INCREMENT: "increment",
};

function reducer(state: any, action: any) {
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

export const Genre = () => {
  const [state, dispatch] = useReducer(reducer, {
    genreList: [],
    popularList: [],
    count: 1,
  });
  const [genre, setGenre] = useState("");
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_Config.API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genre}&page=${state.count}`
        );
        dispatch({
          type: ACTIONS.POPULAR,
          payload: {
            result:
              state.count === 1
                ? response.data.results
                : [...state.popularList, ...response.data.results],
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    getMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.count, genre]);

  useEffect(() => {
    const getGenreList = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_Config.API}&language=en-US`
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
  }, []);

  useEffect(() => {
    if (inView) dispatch({ type: ACTIONS.INCREMENT });
  }, [inView]);

  return (
    <>
      <div className="genre-detail">
        {state.genreList.map((res: any) => {
          return (
            <div
              className={
                genre == res.id ? `genre-box is-genre-active` : `genre-box`
              }
              key={res.id}
              onClick={() => {
                setGenre(res.id);
              }}
            >
              {res.name}
            </div>
          );
        })}
      </div>
      {genre != "" ? (
        <div id="popular-detail">
          <div className="poster-grid">
            {state.popularList.map((res: any) => {
              const date = new Date(res.release_date);
              const poster = `https://image.tmdb.org/t/p/original${res.poster_path}`;
              const movieLink = `/movie/${res.id}`;
              return (
                <div key={res.id}>
                  <div
                    onClick={() => navigate(movieLink)}
                    className="poster-card"
                  >
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
                  </div>
                </div>
              );
            })}
          </div>
          <span ref={ref} />
        </div>
      ) : (
        <>{/* // <div className="genre-banner"></div> */}</>
      )}
    </>
  );
};
