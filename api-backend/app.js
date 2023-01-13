const express = require('express');

//require('custom-env').env('localhost');
const home = require('./routes/home');
const login = require('./routes/login');

const app = express();

app.use('/intelliq_api', home);
app.use('/intelliq_api/login', login);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(flash());

//app.use((req, res, next) => { res.status(404).render('404.ejs', { pageTitle: '404' }) });

module.exports = app;