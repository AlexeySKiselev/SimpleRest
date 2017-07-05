/**
 * Simple REST App
 * Using Express - I can olso use Restify or Hapi
 * Created by Alexey S. Kiselev on June 2017.
 */

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');

// Routes
var index = require('./routes/index'),
    user = require('./routes/user');

// Create app
var app = express();

// App Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', index);
app.use('/user',user);

module.exports = app;
