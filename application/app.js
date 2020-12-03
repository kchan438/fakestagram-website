var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mysqlStore = require('express-mysql-session')(session);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts');
var dbRouter = require('./routes/dbtest');

var app = express();

app.use((req, resp, next) =>
{
    console.info('\x1b[42m\x1b[30m Request URL : ' + req.url + '\x1b[52m\x1b[0m');
    next();
})

var sessionStore = new mysqlStore({/* using default options */}, require('./conf/database'));

var sessionOptions = {
    key: "csid",
    secret: "This is a secret.",
    store: sessionStore,
    //might need to set httpOnly to true to enable front-end use with cookies.
    cookie: {secure: false, httpOnly: false, maxAge: 900000},
    resave: false,
    saveUninitialized: false
}

app.use(session(sessionOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //exposes this 'public' path


app.use('/', indexRouter);
app.use('/dbtest', dbRouter);   //will not be using dbrouter
app.use('/users', usersRouter);
app.use('/posts', postRouter);



app.use((err, req, res, next) =>
{
    console.log(err);
    res.send('Something went wrong with your database.');
})
module.exports = app;

