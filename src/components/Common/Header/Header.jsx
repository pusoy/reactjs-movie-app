import React, { useState } from "react"
import {
    useLocation, 
    useHistory 
} from "react-router-dom"
import './Header.css' 
const axios = require('axios')

let lastUpdate
const Header = () => {
    let location = useLocation()
    let history = useHistory()
    const [text, setText] = useState("");

    const handleClick = (e) => { 
        e.preventDefault()
        let sidebar = document.getElementById('sidebar')
        let overlay = document.getElementById('overlay')

        sidebar.classList.remove('closed')
        sidebar.classList.add('open')

        overlay.classList.remove('closed')
        overlay.classList.add('open')
    }

    const handleChangeQuery = (e) => {
        let newLink = `/search?query=${e.target.value}`
        setText(e.target.value)
        lastUpdate = Date.now()  
        
        setTimeout(() => {
            const diff = Date.now() - lastUpdate;
            if (diff > 500) {
                history.push(newLink) 
            }
        }, 1000);
    } 
 
    const onFormSubmit = e => {
        e.preventDefault(); 
        let newLink = `/search?query=${text}`
        history.push(newLink) 
    }
 

    

    return (
        <div className="header-wrapper default">
            <div id="app-header-desktop" className="app-header">
                <button id="toggle-btn" onClick={handleClick}>
                    <svg fill="none" stroke="currentColor" strokeWidth="2.2" width="24" height="24" strokeLinecap="round" strokeMiterlimit="10" viewBox="0 0 24 24"><line className="st0" x1="12.2" y1="6.6" x2="18.4" y2="6.6"></line><line className="st0" x1="6.4" y1="18.4" x2="13" y2="18.4"></line><line className="st0" x1="6.4" y1="12.5" x2="18.4" y2="12.5"></line></svg>
                </button>
                <form className="searchbar" onSubmit={onFormSubmit}>
                    <div className="search-menu">
                        <div className="search-bar">
                            <input type="text" className="search-box" placeholder="Search" onChange={handleChangeQuery}/>
                        </div>
                    </div>
                </form>
                <div className="user-settings">
                    <a className="signup-button" href="/login">
                        <div className="notify">
                            <div className="notification"></div>
                            <span className="material-icons"> account_circle </span>
                        </div>
                    </a>
                    <div className="notify">
                        <div className="container-darkmode">
                            <label className="switcher" ><input type="checkbox" className="dn" id="dn" />
                                <div>
                                    {/* <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><defs></defs><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path> </svg> */}
                                    <span className="material-icons"> dark_mode </span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header