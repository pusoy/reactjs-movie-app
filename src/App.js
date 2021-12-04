// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";  
import './App.css'
import Sidebar from './components/Common/Sidebar/Sidebar'
import Header from './components/Common/Header/Header'
import Error404 from './components/Error/404' 
import {VideoPlayer} from './components/VideoPlayer/VideoPlayer' 

import { Home, 
  Single, TVShowSingle,
  SearchDetail, 
  Movies,
  TVShows
} from './pages/index' 

function App() { 
  
  const handleClickApp = (e) => {
    e.preventDefault() 
    let sidebar = document.getElementById('sidebar')
    let overlay = document.getElementById('overlay')
    

    sidebar.classList.remove('open')
    sidebar.classList.add('closed')

    overlay.classList.remove('open')
    overlay.classList.add('closed') 
  }
  
  return (
    <Router>
      <div className="App">
        <VideoPlayer/>
        <div id="overlay" className="closed" onClick={handleClickApp}></div>
        <Sidebar></Sidebar>
        <div id="main-container">
          <Header></Header>
          <Switch> 
            <Route exact path="/" component={Home}/>
            <Route path="/movie/:id" component={Single}/>
            <Route path="/search" component={SearchDetail}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/tv-shows" component={TVShows}/>
            <Route path="/tv/:id" component={TVShowSingle}/>
            <Route path="*" component={Error404}/>
          </Switch> 
        </div>
        <div className="notification">
          <span>On going TV-Shows.</span>
        </div>
      </div>
    </Router>
  
  )
}

export default App;
