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

import { Home, 
  Single, 
  SearchDetail, 
  Movies} from './pages/index'

import UseReducer from './_tests/UseReducer/UseReducer'

function App() {
  
  const handleClick = (e) => {
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
        <div id="overlay" className="closed" onClick={handleClick}></div>
        <Sidebar></Sidebar>
        <div id="main-container">
          <Header></Header>
          <Switch> 
            <Route exact path="/"> <Home></Home> </Route>
            <Route path="/movie/:id"> <Single></Single> </Route>
            <Route path="/search">
              <SearchDetail></SearchDetail>
            </Route>
            <Route exact path="/movies">
              <Movies></Movies> 
            </Route>   
            <Route exact path="/reducer">
              <UseReducer></UseReducer>
            </Route>
            <Route path="*">
              <Error404></Error404>
            </Route> 
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
