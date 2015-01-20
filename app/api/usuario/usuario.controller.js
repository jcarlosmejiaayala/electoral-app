'use strict';

var usuarioModel = require('./usuario.model'),
    config = require('../../config/enviroment'),
    jwt = require('jsonwebtoken');

exports.index = function (req, res) {
    usuarioModel.find({}, '-salt -hashedPassword', function(err, users){
        if(err) return res.send(500, err);
        if(!users) return res.status(204).end();
        res.json(200, users);
    });
};

exports.show = function (req, res) {

};

exports.create = function (req, res) {
    var usuario = new usuarioModel(req.body);
    usuario.password = req.body.email;
    usuario.save(function (err, user) {
        if (err) return res.json(422, err);
        res.status(200).end();
    });
};

exports.update = function (req, res) {

};

exports.destroy = function (req, res) {

};