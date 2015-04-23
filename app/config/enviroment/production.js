'use strict';

exports.mongo = {
    uri: 'mongodb://localhost:27017/electoral',
    options: {
        server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
        replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
        db: {
            safe: true
        }
    }
};