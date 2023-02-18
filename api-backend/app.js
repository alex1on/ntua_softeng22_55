const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const intelliq_api = require('./routes/intelliq_api');
const admin = require('./routes/admin');
const statistics = require('./routes/statistics');
const login = require('./routes/login');
const logout=require('./routes/logout')

app.use(express.json());
app.use('/intelliq_api/admin', admin);
app.use('/intelliq_api', intelliq_api);
app.use('/intelliq_api/statistics', statistics);
app.use('/intelliq_api/login', login)
app.use('/intelliq_api/logout',logout)

module.exports = app;