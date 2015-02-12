'use strict';

var Usuario = require('./usuario.model'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    jwt = require('jsonwebtoken'),
    Promise = require('bluebird');

Promise.promisifyAll(Usuario);

exports.index = function (req, res) {
    Usuario
        .findAsync({}, '-salt -hashedPassword')
        .then(function (err, data) {
            if (err) {
                return res.json(500, {message: errors[500]});
            }
            if (!data) {
                return res.json(204, {message: errors[204]});
            }
            res.json(200, data);
        })
        .catch(function (err) {
            res.json(500, {message: errors[500]});
        });
};

exports.show = function (req, res) {

};

exports.create = function (req, res) {
    var usuario = new Usuario(req.body);
    usuario.save(function (err, user) {
        if (err) return res.json(422, err);
        res.status(200).end();
    });
};

exports.update = function (req, res) {

};

exports.destroy = function (req, res) {

};