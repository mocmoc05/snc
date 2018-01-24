'use strict';

// Chat application dependencies
var io = require('socket.io')
var express 	= require('express');
var app  		= express();
var path 		= require('path');
var bodyParser 	= require('body-parser');
var flash 		= require('connect-flash');

//
var http = require('http').Server(app);
var socket = io(http);
// Chat application components
var routes 		= require('./app/routes');
var api 		= require('./app/routes/api');
var session 	= require('./app/session');
var passport    = require('./app/auth');
var ioServer 	= require('./app/socket')(app);
var logger 		= require('./app/logger');
var cors = require('cors');
// Set the port number
var port = process.env.PORT || 3002;

// View engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(cors({origin: '*'}));

// use it before all route definitions

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

const authCheckMiddleware = require('./app/auth/auth-check');
app.use(flash());
app.use('/api', authCheckMiddleware);
app.use('/api', api);
app.use('/', routes);


// Middleware to catch 404 errors
app.use(function(req, res, next) {
  res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
});


