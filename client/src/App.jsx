import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { Switch, Route, Link } from 'react-router-dom';
import waka_data from '../../config/data/wakatime_chilly3.json';
import Home from './components/Home.jsx';
import User from './components/User.jsx';
import Project from './components/Project.jsx';
import Technology from './components/Technology.jsx';
import Stats from './components/Stats.jsx';


const user_data = waka_data.user;

const App = () => {

  return (
    <div>
      <h1 className="title">Project Tracker Data Routes</h1>
      <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li className="appnav">
              <Link to="/" className="app-link">Home</Link>
            </li>
            <li className="appnav">
              <Link to="/project" className="app-link">Projects</Link>
            </li>
            <li className="appnav">
              <Link to="/technology" className="app-link">Technologies</Link>
            </li>
            <li className="appnav">
              <Link to="/user" className="app-link">User</Link>
            </li>
            <li className="appnav">
              <Link to="/stats" className="app-link">Stats</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/project"><Project /></Route>
          <Route path="/technology"><Technology /></Route>
          <Route path="/user"><User /></Route>
          <Route path="/stats"><Stats /></Route>
          <Route path="/:id">
            <p>This text will render for any route other than those defined above</p>
          </Route>
        </Switch>
    </div>
  )
}

export default App;