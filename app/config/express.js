'use strict';

var express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    config = require('./enviroment'),
    passport = require('passport'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose');

module.exports = function (app) {
    app.set('appPath', path.join(config.root, '/public'));
    app.set('view engine', 'html');
    app.engine('html', require('ejs').renderFile);
    app.use(compression({level: 9}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session({
        secret: config.secrets.session,
        resave: true,
        saveUninitialized: true,
        store: new mongoStore({mongoose_connection: mongoose.connection})
    }));
    app.use(passport.initialize());
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    if ('development' == app.get('env')) app.use(errorHandler());
};
