import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import session from 'express-session';
import MemoryStore from 'memorystore';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

// import indexRouter from './staticrouter/index';
import usersRouter from './user/user.router';
import reimbursementRouter from './reimbursement/reimbursement.router';
import publicDir from './constant';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({origin:process.env.CLIENT, credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));
app.use(session({
  secret: 'whatever',
  store: new (MemoryStore(session))({checkPeriod: 86400000}),
  cookie: {}
  })
);

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reimbursements', reimbursementRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err: any, req: any, res: any, next: Function) {
  // Send error file
  res.status(err.status || 500);
  res.sendFile('/error.html', {root: publicDir});
});

module.exports = app;
