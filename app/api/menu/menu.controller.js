'use strict';
var config = require('../../config/enviroment'),
    _ = require('lodash');
exports.index = function (req, res) {
    if (!req.menu) {
        req.menu = _.reject(config.menu, {name: 'Ingresar'});
    }
    res.json(200, req.menu);
};