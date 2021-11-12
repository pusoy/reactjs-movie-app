
import React from "react"
import './Sidebar.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Sidebar = () => {
    return (
        <div id="sidebar" className="closed">
            <div id="sidebar-content">
                <section>
                    <div className="sidebar">
                        <a href="foo" className="logo-expand">MovieCloud</a>
                        <div className="side-wrapper">
                            <div className="side-title">MENU</div>
                            <div className="side-menu">
                                {/* <a  href="/test"> <span className="material-icons"> home </span> Home</a> */}
                                <Link to="/" className="sidebar-link"><span className="material-icons"> home </span> Home</Link>
                                {/* <Link to="/roulette" className="sidebar-link"> <span className="material-icons"> shuffle_on </span> Roulette</Link>
                                <a className="sidebar-link" href="/slider"> <span className="material-icons"> slideshow </span> Slider</a>
                                <a className="sidebar-link" href="/slider"> <span className="material-icons"> slideshow </span> Slider</a> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div> 
        </div>
    )
}

export default Sidebar