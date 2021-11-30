import React, {useState, useEffect} from "react"
import "./VideoPlayer.css"

const getIds = (param1 = 0, param2 = 0, str=null) => {
    let data = {
        series: {
            parentId: param1,
            episodeId: param2
        },
        type: str
    } 
    let player = document.getElementsByClassName('movieModal')
    // let 
    // data.type !== null ? {
    //     <h2>aasdasd</h2>
    // } 
    // data.type !== null ? player.style.display = "block" : player.style.display = 'none'
    
}
const VideoPlayer = () => { 
    let videoLink = `https://www.2embed.ru/embed/tmdb`
 
    return (
        <div className="movieModal">
            <iframe src={videoLink} frameBorder="0"></iframe>
        </div>
    )
}

export {VideoPlayer, getIds}