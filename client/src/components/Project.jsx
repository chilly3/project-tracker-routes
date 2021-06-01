import React, { useState, useEffect } from 'react';
import axios from 'axios';
import async from 'async';
import { DateTime } from 'luxon';
import { Switch, Route, Link } from 'react-router-dom';
import waka_data from '../../../config/data/wakatime_chilly3.json';

const Project = () => {
  
  const user_data = waka_data.user;
  const userid = user_data.id;

  const [projects, setProjects] = useState({});
  const [project_time, setProject_time] = useState('')
  
  const getProject_time = () => {

    let elements = [];


    projects.map((project, i) => {
      const project_name = project.name;
      const created = project.created_at;
      const id = project.id;
      const activity = project.last_heartbeat_at;

      axios.get(`/api/v1/users/${userid}/all_time_since_today/${project_name}`)
      .then(({ data } = res) => {
        let currentTime = data.data.text;
        let objVar = {
          id: id,
          name: project_name,
          start_date: created,
          total_time: currentTime,
          last_activity: activity
        }
        elements.push(objVar);
      })
      .catch(err => {
        console.log(err);
      })
    })
    setProjects(elements)
  }

  const getProjects = (event) => {
    event.preventDefault();
    axios.get(`/api/v1/users/${userid}/projects`)
    .then(({ data } = res) => {
      setProjects(data.data)
      console.log(data.data);
    })
    .catch(err => {
      console.log(err);
    });
  }
  return (
    <div className="content">
      <div>
        <div>
          <hr></hr>
          <h2 className="content-title">Projects</h2>
          <button className="get-projects" onClick={getProjects}>Get Projects</button>
          <hr></hr>
          <button className="get-project-time" onClick={getProject_time}>Get Project Time</button>
      </div>
    </div>
  </div>
  );
}

export default Project;