'use strict';

var Usuario = require('./usuario.model'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    Promise = require('bluebird');

Promise.promisifyAll(Usuario);

exports.me = function (req, res) {
    Usuario
        .findOneAsync({_id: req.user._id}, '-salt -hashedPassword')
        .then(function (user) {
            if (!user) {
                return res.json(401, {message: errors[401]});
            }
            res.json(200, user);
        }).catch(function () {
            return res.json(500, {message: errors[500]});
        });
};