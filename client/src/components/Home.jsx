import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import async from 'async';
import { DateTime } from 'luxon';
import waka_data from '../../../config/data/wakatime_chilly3.json';

const Home = () => {
  const userid = waka_data.user.id;
  const range = 'last_6_months';

  const [total_time, setTotal_time] = useState();
  const [stats, setStats] = useState();
  let tc;
  let pc;

  
  useEffect(() => {

    Promise.all([getStats(), getTotal_time()])
    .then((results) => {})
    .catch(err => {
      console.log(err);
    });

  }, [])

  const getTotal_time = () => {
    axios.get(`/api/v1/users/${userid}/all_time_since_today`)
    .then(({ data} = res) => {
      const { text } = data.data;
      setTotal_time(text);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const getStats = () => {
    axios.get(`/api/v1/users/${userid}/stats/${range}`)
    .then(({ data} = res) => {
      const { dependencies, projects} = data.data;

      let project = projects.map((project) => {
        return {
          name: project.name,
          time: project.text,
          percent: project.percent
        }
      })
      let technologies = dependencies.map((dependency) => {
        return {
          name: dependency.name,
          id: dependency.name
        }
      })
      let t = technologies.length;
      let p = project.length;
      setStats([t, p]);
    })
    .catch(err => {
      console.log(err);
    });
  }

  if (stats !== undefined) {
    tc = stats[0];
    pc = stats[1];
  }

  console.log(stats)

  return (
    <div className="content">
      <div>
        <div>
          <hr></hr>
          <h2 className="content-title">Home</h2>
          <p>Welcome to <em>Project Tracker Database</em>, a basic website built with react, express, and mongoose for keeping track of coding projects.</p>
          <ul className="counts">
            <li><strong>Projects: </strong><i className="alert-info">{pc}</i></li>
            <li><strong>Technologies: </strong><i className="alert-info">{tc}</i></li>
            <li><strong>Total Logged Time: </strong><i className="alert-success">{total_time}</i></li>
          </ul>
        </div>
      </div>
    </div>
  );

}

export default Home;