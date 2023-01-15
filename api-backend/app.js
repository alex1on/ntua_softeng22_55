const express = require('express');
const path = require('path');

const app = express();

const intelliq_api = require('./routes/intelliq_api');
const admin = require('./routes/admin');


app.use(express.json());
app.use('/intelliq_api/admin', admin);
app.use('/intelliq_api', intelliq_api);

module.exports = app;