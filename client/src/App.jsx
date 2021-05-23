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
const daily_data = waka_data.days;


const App = () => {

  let all_time_data = 0;
  let grandtotal = daily_data.map((day) => {
    all_time_data += day.grand_total.total_seconds;
  })
  console.log(all_time_data);
  return (
    <div>
      <h1 className="title">Project Tracker Data Routes</h1>
      <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/project">Projects</Link>
            </li>
            <li>
              <Link to="/technology">Technologies</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
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