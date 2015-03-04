'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var config = require('./config/enviroment'),
    express = require('express'),
    mongoose = require('mongoose'),
    uriUtil = require('mongodb-uri'),
    app = express(),
    server = require('http').createServer(app),
    socketio = require('socket.io')(server, {
        serveClient: (config.env == 'production') ? false : true,
        path: '/socket.io-client'
    });
mongoose.connect(uriUtil.formatMongoose(config.mongo.uri), config.mongo.options);
//mongoose.connect(config.mongo.uri, config.mongo.options);
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, function () {
    console.log('servidor corriendo en el puerto %d en modo %s', config.port, app.get('env'));
});

module.exports = app;