import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import async from 'async';
import { DateTime } from 'luxon';
import waka_data from '../../../config/data/wakatime_chilly3.json';

const User = () => {

  const user_data = waka_data.user;
  const userid = user_data.id;
  const ranges = ['Today', 'Yesterday', 'Last 7 Days', 'Last 7 Days from Yesterday', 'Last 14 Days', 'Last 30 Days', 'This Week', 'Last Week', 'This Month', 'Last Month'];
  
  const [dates, setDates] = useState('');
  const [range, setRange] = useState('Today');
  const [start_date, setStart_date] = useState('');
  const [summary_time, setSummary_time] = useState('');
  const [total_time, setTotal_time] = useState('');
  const [user_info, setUser_info] = useState({});


  useEffect(() => {
    let isActive = true;

    Promise.all([getUser_info(), getTotal_time(), getSummary()])
    .then((results) => {})
    .catch(err => {
      console.log(err);
    });

    return () => {
      isActive = false;
    }
  }, [])

  const rangeSet = () => {
    console.log(`range: ${event.target.value}`);
    setRange(event.target.value);
  }

  const getSummary = (event) => {
    let e;
    if (event === undefined) {
      e = "Today";
    } else {
      event.preventDefault();
      e = event.target.value;
    }
    axios.get(`/api/v1/users/${userid}/summaries/${e}`)
    .then(({ data } = res) => {
      let days = 0;
      data.data.map((day) => {
        days += day.grand_total.total_seconds;
      })
      let seconds = days % 60;
      let minutes = ((days - seconds) / 60) % 60;
      let hours = (days - seconds - (minutes * 60)) / 3600;

      let start = DateTime.fromISO(data.start).toLocaleString({ month: 'short', day: '2-digit'});
      let end = DateTime.fromISO(data.end).toLocaleString({ month: 'short', day: '2-digit'});
      
      start === end ? setDates(`${start} : `) : setDates(`${start} to ${end} : `);
      setSummary_time(`${hours} hrs ${minutes} mins`);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const getTotal_time = () => {

    axios.get(`/api/v1/users/${userid}/all_time_since_today`)
    .then(({ data } = res) => {
      setTotal_time(data.data.text)
      setStart_date(`, since ${data.data.range.start_text}`)
    })
  }

  const getUser_info = () => {
    axios.get(`/api/v1/users/${userid}`)
    .then(({ data } = res) => {
      let activity = DateTime.fromISO(data.data.last_heartbeat_at).ts;
      let ago = DateTime.now().ts - activity;
      let moment = DateTime.now().minus(ago).toRelative();
      
      setUser_info({
        email: data.data.email,
        id: data.data.id,
        last_activity: moment,
        last_project: data.data.last_project,
        photo: data.data.photo
      })
    })
  }

  let selectForm = ranges.length > 0 && ranges.map((range, i) => {
    return (
      <option key={i} value={range}>{range}</option>
    )
  }, this);

  console.log(user_info);
  return (
    <div className="content">
      <div>
        <div>
          <hr></hr>
          <h2 className="content-title">User</h2>
          <img src={user_info.photo} alt="user-photo" className="user-photo" />
          <p><i className="alert-dark strong">User: </i>{user_data.email}</p>
          <p className="alert-dark"><strong>Last activity: </strong><i className="alert-info">{user_info.last_project}  </i>
          <small className="alert-muted"><em>{user_info.last_activity}</em></small></p>
          <p className="alert-dark"><strong>Total activity: </strong>
          <i className="alert-success"> {total_time}</i><i className="alert-muted">{start_date}</i></p>
          <hr></hr>
          <p className="alert-dark"><strong>Recent activity: </strong>
          <i className="alert-muted">{dates}</i>
          <i className="alert-success"> {summary_time} </i>
            <select value={event.target.value} onChange={getSummary}>
              {selectForm}
            </select>
          </p>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}

export default User;