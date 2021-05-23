import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import async from 'async';
import { DateTime } from 'luxon';
import waka_data from '../../../config/data/wakatime_chilly3.json';
import StatsDetail from './views/StatsDetail.jsx';

const Stats = ({match}) => {
  const { url } = useRouteMatch();
  const ranges = ['last_7_days', 'last_30_days', 'last_6_months', 'last_year'];

  /*Create an array of <li> items for each range*/
  const linkList = ranges.map((range, i) => {
    return (
      <li key={i}  className="h-item">
        <Link className="stat-link" to={`${url}/${range}`}><i className="alert-light"><strong>{range}</strong></i></Link>
      </li>
    )
  });
  



  return (
    <div className="content">
      <div>
        <div>
          <hr></hr>
          <h2 className="content-title">Stats</h2>
          <Route exact path={url}>
          <ul className="h-nav">{linkList}</ul>
          </Route>
          <Route path={`${url}/:range`}>
            <StatsDetail data={ranges} />
          </Route>
        </div>
      </div>
    </div>
  );
}

export default Stats;