const async = require('async');
const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

let wakatime_api = require('../config/waka.config');
let app = express();
let port = 5000;

//Import models
const Project = require('./models/project');
const Technology = require('./models/technology');
const User = require('./models/user');

//Routes
const waka_routes = require('./wakaRoutes');

app.use('/api/v1', waka_routes);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});