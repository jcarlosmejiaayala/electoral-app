'use strict';
var config = require('../../config/enviroment'),
    _ = require('lodash');

exports.index = function (req, res) {
    res.json(200, req.menu);
};