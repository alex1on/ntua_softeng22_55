const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const intelliq_api = require('./routes/intelliq_api');
const admin = require('./routes/admin');
const statistics = require('./routes/statistics');

app.use(express.json());
app.use('/intelliq_api/admin', admin);
app.use('/intelliq_api', intelliq_api);
app.use('/intelliq_api/statistics', statistics);

module.exports = app;