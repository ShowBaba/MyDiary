const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

const router = require('./routes/index');

const app = express();
const corsOptions = {
  origin: '*',
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use(passport.initialize());

// TODO: add home route here;
app.get('/api/v1', (req, res) => {
  // res.redirect('/api/v1');
  res.json({ status: 'success', message: 'Welcome To MyDiary API' });
});

app.get('/entries', (req, res) => {
  res.redirect('/api/v1/entries');
});

// app.use('/api/v1/', indexRouter);
app.use('/api/v1/users', router.usersRoute);
app.use('/api/v1/entries', router.entriesRoute);

// set up a wildcard route
app.get('*', (req, res) => {
  res.redirect('/api/v1');
});

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
