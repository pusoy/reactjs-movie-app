import React, {useState, useEffect} from "react"
import "./VideoPlayer.css"

 
const VideoPlayer = () => { 
    let videoLink = `https://www.2embed.ru/embed/tmdb`
 
    return (
        <div className="movieModal">
            <iframe src={videoLink} frameBorder="0"></iframe>
        </div>
    )
}

export default VideoPlayer