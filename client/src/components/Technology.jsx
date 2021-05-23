import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import async from 'async';
import { DateTime } from 'luxon';
import TechnologyDetail from './views/TechnologyDetail.jsx';
import waka_data from '../../../config/data/wakatime_chilly3.json';

const Technology = () => {
  const userid = waka_data.user.id;
  const range = 'last_6_months';
  const [stats, setStats] = useState();
  const { url } = useRouteMatch();
  let linkList;

  useEffect(() => {
    let isActive = true;

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
      setStats(technologies);
    })
    .catch(err => {
      console.log(err);
    });

    return () => {
      isActive = false;
    }
  }, [])

  const reload_page = () => {
    console.log("reload")
    window.location.reload();
  }
  // /* Create an array of <li> items for each technology */
  if (stats !== undefined) {

    linkList = stats.map((technology, i) => {
      const id = technology.id;
      const name = technology.name;
      return (
        <li key={i} className="tech-item">
          <Link to={`${url}/${id}`} className="tech-link strong">{name}</Link>
        </li>
      )
    });
  }

  return (
    <div className="content">
      <div>
        <div>
          <hr></hr>
            <ul className="navbar-tech tech-block"><i className="tech-nav-title">Technologies: </i>
            {linkList}</ul>
          <h2 className="content-title">Technology</h2>
          <Route path={`${url}/:technologyId`}>
            <TechnologyDetail data={stats} />
          </Route>
          <Route exact path={url}>
          </Route>
        </div>
      </div>
    </div>
    );

}

export default Technology;