import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch, useParams} from 'react-router-dom';
import axios from 'axios';
import async from 'async';
import { DateTime } from 'luxon';
import waka_data from '../../../../config/data/wakatime_chilly3.json';


const StatsDetail = ({data}) => {
  const { days, user } = waka_data;
  const userid = user.id;
  const ranges = ['last_7_days', 'last_30_days', 'last_6_months', 'last_year'];
  const { url, path } = useRouteMatch();
  let slash = url.lastIndexOf('/') + 1;
  let range = url.slice(slash);
  let currentStats;

  const [stats, setStats] = useState({});
  const [new_range, setNew_range] = useState({});

  const getStats = () => {
    axios.get(`/api/v1/users/${userid}/stats/${range}`)
    .then(({ data} = res) => {
      const { best_day, human_readable_daily_average_including_other_language, human_readable_range, human_readable_total_including_other_language, end, start, user_id, dependencies, editors, languages, operating_systems, projects} = data.data;
      let daydate = DateTime.fromISO(best_day.date).toLocaleString({ weekday: 'long', month: 'short', day: '2-digit'});
      let best = {
        date: daydate,
        time: best_day.text
      }
      let ide = editors.map((editor) => {
        return { 
          name: editor.name,
          time: editor.text,
          percent: editor.percent
        }
      })
      let technology = languages.map((technology) => {
        return {
          name: technology.name,
          time: technology.text,
          percent: technology.percent
        }
      })
      let system = operating_systems.map((os) => {
        return {
          name: os.name,
          time: os.text,
          percent: os.percent
        }
      })
      let project = projects.map((project) => {
        return {
          name: project.name,
          time: project.text,
          percent: project.percent
        }
      })
      setStats({
        human_readable_range: human_readable_range,
        best: best,
        daily_average: human_readable_daily_average_including_other_language,
        total: human_readable_total_including_other_language,
        start: start,
        end: end,
        user_id: user_id,
        editors: ide,
        languages: technology,
        systems: system,
        projects: project
      })
      setNew_range(url.slice(slash))
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  useEffect(() => {
    let isActive = true;


    getStats();

    return () => {
      isActive = false;
    }
  }, [])


  if (stats) {
    
    if (new_range !== range) {
      getStats();
    } else {

      let language = stats.languages.map((language, i) => {
        let name = language.name;
        let time = language.time;
        let percent = Math.round(language.percent);
        if (percent < 1) {
          percent = ``;
        } else {
          percent = `${percent}%`
        }

        return (
          <tbody className="tbody-stat" key={i}>
            <tr className="tr-stat">
              <td className="td-stat"><i className="alert-dark v-item"><strong>{name}</strong></i></td>
              <td className="td-stat"><i className="alert-success v-item">{time} </i><small><em className="alert-info v-item">{percent}</em></small></td>
            </tr>
          </tbody>
        )
      })

      let project = stats.projects.map((project, i) => {
        let name = project.name;
        let time = project.time;
        let percent = Math.round(project.percent);
        if (percent < 1) {
          percent = ``;
        } else {
          percent = `${percent}%`
        }
        return (
          <tbody className="tbody-stat" key={i}>
            <tr className="tr-stat">
              <td className="td-stat"><i className="alert-dark v-item"><strong>{name}</strong></i></td>
              <td className="td-stat"><i className="alert-success v-item">{time} </i><small><em className="alert-info v-item">{percent}</em></small></td>
            </tr>
          </tbody>
        )
      })

      currentStats = (
        <div>
          <h2 className="content-title">{stats.human_readable_range}</h2>
          <p className="alert-dark"><strong>Best Day: </strong>
          <i className="alert-success"> {stats.best.time}</i><small className="alert-muted"><em>  {stats.best.date}</em></small></p>
          <p className="alert-dark"><strong>Daily Average: </strong><i className="alert-success"> {stats.daily_average}</i></p>
          <div className="stat-row">
            <div className="stat-col">
              <h3 className="alert-dark"><strong>Languages Used: </strong>
              </h3>
              <table className="stat-table">
                {language}
              </table>
            </div>
            <div className="stat-col">
              <h3 className="alert-dark"><strong>Projects: </strong>
              </h3>
              <table className="stat-table">
                {project}
              </table>
            </div>
          </div>
        </div>
      )
    }

  }

  const nav_list = ranges.map((range, i) => {
    return (
      <li key={i}  className="h-item">
        <Link className="stat-link" to={`${range}`}><i className="alert-light"><strong>{range}</strong></i></Link>
      </li>
    )
  });

  console.log(stats);
  return (
    <div>
      <Route exact path={url}>
        <ul className="h-nav">{nav_list}</ul>
      </Route>
      <div>{currentStats}</div>
    </div>
  );
}

export default StatsDetail;