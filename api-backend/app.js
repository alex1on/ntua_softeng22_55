const express = require('express');
const path = require('path');

const app = express();

const intelliq_api = require('./routes/intelliq_api');


app.use(express.json());
app.use('/intelliq_api', intelliq_api);

module.exports = app;