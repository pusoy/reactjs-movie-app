import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import Config from "./../../../api/config";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const ACTIONS = {
  INCREMENT: "increment",
  RESET: "reset",
  CHANGE_COUNT: "change-count",
  POPULAR: "popular",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return {
        count: state.count + 1,
        popularList: state.popularList,
      };
    case ACTIONS.POPULAR:
      return {
        count: state.count,
        popularList: action.payload.result,
      };
    default:
      return state;
  }
}

const Popular = () => {
  const [state, dispatch] = useReducer(reducer, { count: 1, popularList: [] });
  const { ref, inView } = useInView();

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${
            Config().API
          }&language=en-US&page=${state.count}`
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
  }, [state.count]);

  useEffect(() => {
    if (inView) dispatch({ type: ACTIONS.INCREMENT });
  }, [inView]);
  return (
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
  );
};

export default Popular;
