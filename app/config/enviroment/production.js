'use strict';

exports.mongo = {
    uri: 'mongodb://localhost:27017/electoral',
    options: {
        db: {
            safe: true
        }
    }
};