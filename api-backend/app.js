const express = require('express');

//require('custom-env').env('localhost');
const intelliq_api = require('./routes/intelliq_api');

const app = express();

app.use('/intelliq_api', intelliq_api);

module.exports = app;