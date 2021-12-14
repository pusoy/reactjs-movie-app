import React, {useState, useEffect} from "react"
import "./VideoPlayer.css"

 
const VideoPlayer = (props) => {  
  
    props.visible ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto" 
 
    if (props.visible) { 
        var data = props.data.split('|')
        var id = data[0]
        var season = data[1]
        var episode = data[2]

        var videoLink = `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`
        return ( 
            <div className="player"> 
                <span onClick={() => { document.querySelector('.player').remove(); document.body.style.overflow = "auto"; }}>x</span >
                <iframe src={videoLink} frameBorder="0" name="myframe"></iframe>
            </div >
        )
    }else {
        return (
            <div>
            </div>
        )
    }
    
}

export default VideoPlayer