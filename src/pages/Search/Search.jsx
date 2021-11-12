import {
  useLocation,
  Link
} from "react-router-dom";
import React, { useState, useEffect } from "react"
import "./Search.css"
import noPoster from "./../../assets/img/poster-holder.jpg"
const axios = require('axios');

const Search = (query) => {
  let location = useLocation();
  if (query != ""){
    console.log(location);
    let newLink = `/search?query=${query}`;
    window.location.href = `${newLink}`
  } 
}
    // https://api.themoviedb.org/3/search/multi?api_key=4ef0ef4242c8e5901d432415e7a824b9&query=test&page=1
const SearchDetail = () => {
  const [searchData, setsearchData] = useState({})
  const [searchResult, setsearchResult] = useState([])
  const [counter, setCounter] = useState(1)

  let location = useLocation()
  let query = location.search.replace('?', '')
  let searchString = location.search.split('=')[1]
  
  useEffect(() => {
    // Update the document title using the browser API
    const getSearch = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=4ef0ef4242c8e5901d432415e7a824b9&${query}&page=${counter}`)
        setsearchData(response.data)
        setsearchResult([...searchResult, ...response.data.results])
      } catch (error) {
        console.error(error)
      }
    }
    getSearch()
  }, [counter]);

  console.log(searchResult)

  const handleLoadMore = (e) => {
    e.preventDefault()
    setCounter(counter + 1)
  }

  if (Object.keys(searchResult).length == 0){
    return (
      <div id="searchpage" className="container">
        <p>Looks like something went wrong :(<br></br></p>
      </div>
      
    )
  }
   
  return (
    <div id="searchpage" className="container">
      <p className="info">Page {searchData.page} of {searchData.total_pages}. Showing {Object.keys(searchResult).length} results of {searchData.total_results}</p>
      <section>
        <h1>Search results for: {searchString.replace(/%20/g, " ")}</h1>
        <div className="poster-grid">
          {
            searchResult.map(res => { 
              let date, title, posterLink

              date = res.release_date != undefined ? date = new Date(res.release_date) : res.first_air_date != undefined ? new Date(res.first_air_date) : '---'
              title = res.original_title != undefined ? res.original_title : res.original_name != undefined ? res.original_name : res.known_for[0].original_title
              posterLink = res.poster_path != undefined ? `https://image.tmdb.org/t/p/original${res.poster_path}` : noPoster

              const posterAlt = `Poster for ${res.original_name}`
              const movieLink = `movie/${res.id}`
        
               
              return (
                <div key={res.id}>
                  <Link to={movieLink} className="poster-card" >
                    <img className="poster img-with-fb no-js-1MJNcPZy46hIy2CmSqOeru0yr5C" src={posterLink} cached="true" loading="lazy" alt={posterAlt} />
                    <div className="overlay-text">
                      <div className="overlay-text-rating">HD</div>
                    </div>
                    <p className="title">{title}</p>
                    <div className="meta">
                      { date == '---' ? '---' : isNaN(date.getFullYear()) ? "----" : date.getFullYear()}
                      <i className="dot"></i>
                      {res.vote_average != undefined ? res.vote_average : 0}
                      <i className="type">Movie</i>
                    </div>
                  </Link>
                </div>
              )
            })
            // searchResult.map((res) => {
            //   // console.log(res)
            //   const date = new Date(res.release_date)
            //   const poster = `https://image.tmdb.org/t/p/original${res.poster_path}`
            //   const movieLink = `movie/${res.id}`
            //   return (
            //     <div key={res.id}>
            //       <Link to={movieLink} className="poster-card" >
            //         <img className="poster img-with-fb no-js-1MJNcPZy46hIy2CmSqOeru0yr5C" src={poster} cached="true" loading="lazy" alt="Poster for Venom: Let There Be Carnage" />
            //         <div className="overlay-text">
            //           <div className="overlay-text-rating">HD</div>
            //         </div>
            //         <p className="title">{res.original_title}</p>
            //         <div className="meta">
            //           {date.getFullYear()} <i className="dot"></i> {res.vote_average}
            //           <i className="type">Movie</i>
            //         </div>
            //       </Link>
            //     </div>
            //   )
            // })
          }
          {/* <div>
            <Link to="/foo" className="poster-card" >
              <img className="poster img-with-fb no-js-1MJNcPZy46hIy2CmSqOeru0yr5C" src="https://image.tmdb.org/t/p/w342/zZMebBIsNipjFhJFv0zjm0KQaBF.jpg" cached="true" loading="lazy" alt="Poster for Venom: Let There Be Carnage" />
              <div className="overlay-text">
                <div className="overlay-text-rating">HD</div>
              </div>
              <p className="title">The Beta Test</p>
              <div className="meta">
                2021
                <i className="dot"></i>
                5.8
                <i className="type">Movie</i>
              </div>
            </Link>
          </div> */}
        </div>
        <div className="more"><h6 onClick={handleLoadMore}>... Load More ...</h6></div>
      </section>
    </div>
  )
}

 
export { SearchDetail, Search}