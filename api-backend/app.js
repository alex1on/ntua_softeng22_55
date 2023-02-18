const express = require('express');
const path = require('path');

const app = express();

const intelliq_api = require('./routes/intelliq_api');
const admin = require('./routes/admin');
const statistics = require('./routes/statistics');
const login = require('./routes/login');

app.use(express.json());
app.use('/intelliq_api/admin', admin);
app.use('/intelliq_api', intelliq_api);
app.use('/intelliq_api/statistics', statistics);
app.use('/intelliq_api/login', login)

module.exports = app;