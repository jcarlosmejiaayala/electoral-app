'use strict';

exports.mongo = {
    uri: 'mongodb://electoral:electoral@ds051970.mongolab.com:51970/electoral',
    options: {
        server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
        replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
    }
};