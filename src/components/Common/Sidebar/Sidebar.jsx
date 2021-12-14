
import React, { useState, useEffect } from "react"
import './Sidebar.css'
import {
    Link
} from "react-router-dom"

const images = {
    fireboy: "images/fire-boy.gif"
}
console.log(images.fireboy)
const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [activeMenu])
    
    let handleClick = str => { 
        setActiveMenu(str)
        let sidebar = document.getElementById('sidebar')
        let overlay = document.getElementById('overlay')


        sidebar.classList.remove('open')
        sidebar.classList.add('closed')

        overlay.classList.remove('open')
        overlay.classList.add('closed') 
    }

    return (
        <div id="sidebar" className="closed">
            <div id="sidebar-content">
                <section>
                    <div className="sidebar">
                        <a href="foo" className="logo-expand"><img src="images/main-logo.png" alt="" /></a>
                        <div className="side-wrapper">
                            <div className="side-title">MENU</div>
                            <div className="side-menu">
                                {/* <a  href="/test"> <span className="material-icons"> home </span> Home</a> */}
                                <Link to="/" className={activeMenu === 'Home' ? 'sidebar-link is-active' : 'sidebar-link'} onClick={() => { handleClick("Home") }}><span className="material-icons"> home </span> Home</Link>
                                <Link to="/movies" className={activeMenu === 'Movies' ? 'sidebar-link is-active' : 'sidebar-link'} onClick={() => { handleClick("Movies") }}><span className="material-icons"> video_library </span> Movies</Link>
                                {/*  <small className="devmode">dev</small> */}
                                <Link to="/tv-shows" className={activeMenu === 'TV-Shows' ? 'sidebar-link is-active' : 'sidebar-link'} onClick={() => { handleClick("TV-Shows") }}> <span className="material-icons"> live_tv </span> TV Shows</Link>
                                {/*<a className="sidebar-link" href="/slider"> <span className="material-icons"> slideshow </span> Slider</a>
                                <a className="sidebar-link" href="/slider"> <span className="material-icons"> slideshow </span> Slider</a> */}
                            </div>
                        </div>
                        {/* <img src={images.fireboy} className="animated-gif" /> */}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Sidebar