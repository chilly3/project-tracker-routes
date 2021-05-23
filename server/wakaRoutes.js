const async = require('async');
const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const { body, validationResult } = require('express-validator');

const User = require('./models/user');
const Project = require('./models/project');
const Technology = require('./models/technology');

let wakatime_api = require('../config/waka.config');

const router = express.Router();
router.use(bodyParser.json());

///USER API ROUTES///

//GET all logged time
router.get('/users/:userid/all_time_since_today', (req, res) => {
  let userid = req.params.userid;
  let authorization = wakatime_api;

  axios({
    url: `/api/v1/users/${userid}/all_time_since_today`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
    console.log(data.data.text);
  })
  .catch(err => console.log(err));
});

//GET user information
router.get('/users/:userid', (req, res) => {
  let userid = req.params.userid;
  let authorization = wakatime_api;

  axios({
    url: `/api/v1/users/${userid}`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});

//GET stats for range (stats per period)
router.get('/users/:userid/stats/:range', (req, res) => {
  let range = req.params.range;
  let userid = req.params.userid;
  let authorization = wakatime_api;
  console.log(req.params)

  axios({
    url: `/api/v1/users/${userid}/stats/${range}`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});


//GET summaries for range (time per period)
router.get('/users/:userid/summaries/:range', (req, res) => {
  let range = req.params.range;
  let userid = req.params.userid;
  let authorization = wakatime_api;

  axios({
    url: `/api/v1/users/${userid}/summaries?range=${range}`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});



///PROJECT API ROUTES///

//GET projects for userid
router.get('/users/:userid/projects', (req, res) => {
  let userid = req.params.userid;
  let authorization = wakatime_api;

  axios({
    url: `/api/v1/users/${userid}/projects`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});

//GET total time for project
router.get('/users/:userid/all_time_since_today/:project', (req, res) => {
  let userid = req.params.userid;
  let project = req.params.project;
  let authorization = wakatime_api;

  axios({
    url: `/api/v1/users/${userid}/all_time_since_today?project=${project}`,
    method: 'get',
    baseURL: 'https://wakatime.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://wakatime.com',
      'Authorization': authorization
    }
  })
  .then(({ data } = res) => {
    res.send(data);
  })
  .catch(err => console.log(err));
});


module.exports = router;