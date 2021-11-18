import React, { useReducer, useEffect, useState } from "react"
import {
    Link
} from "react-router-dom";
import Config from "./../../../api/config"
const axios = require('axios');

const ACTIONS = {
    GENRE: 'genre'
}

function reducer(state, action) {
    switch (action.type) { 
        case ACTIONS.GENRE:
            return {
                genreList: action.payload.result 
            }
        default:
            return state
    }
}


const Genre = () => { 
    const [state, dispatch] = useReducer(reducer, { genreList: [] })
    const [genre, setGenre] = useState("")

    useEffect(() => {
        const getGenreList = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${Config().API}&language=en-US`)
                dispatch({ type: ACTIONS.GENRE, payload: { result: response.data.genres } })
            } catch (error) {
                console.error(error);
            }
        }
        getGenreList()

    }, [setGenre]);
    return (
        <>
            <div className="genre-detail">
                {
                    state.genreList.map((res) => {
                        let genreLink = `/movies`
                        return (
                            <Link className="genre-box" to={genreLink} key={res.id} onClick={() => { setGenre(res.id) } } >{res.name}</Link>
                        ) 
                    })
                }  
            </div> 
            <div className="buy-me-a-coffee">
            <a href="https://www.paypal.me/JaffyMaglinte" target="_blank">Paypal</a>
                <img src="https://c.tenor.com/ycKJas-YT0UAAAAd/im-waiting-aki-and-paw-paw.gif"/> 
            </div>
        </>
    )
}

export default Genre