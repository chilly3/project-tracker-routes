import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
import axios from 'axios';
import async from 'async';
import { DateTime } from 'luxon';
import waka_data from '../../../../config/data/wakatime_chilly3.json';

const TechnologyDetail = ({data}) => {
  const { technologyId } = useParams();
  const technology = data.find(t => t.id === technologyId);
  let technologies;

  if (technology) {
    technologies = (
      <div>
        <h2 className="content-title tech-name-title">{technology.name}:</h2>
        <p className="alert-dark"><strong>Documentation: </strong><i className="alert-muted em">Url to documentation goes here</i></p>
        <p className="alert-dark"><strong>Description: </strong><i className="alert-muted em">Technology description goes here</i></p>
      </div>
    );
  } else {
    technologies = <h3 className="alert-danger">Technology not listed in the database</h3>
  }

  return (
    <div>
      <div>{technologies}</div>
    </div>
  )
}

export default TechnologyDetail;