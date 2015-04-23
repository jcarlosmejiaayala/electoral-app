'use strict';

var Usuario = require('../../model/usuario'),
    Distrito = require('../../model/distrito'),
    Seccion = require('../../model/seccion'),
    config = require('../../config/enviroment'),
    _ = require('lodash'),
    errors = require('../../components/errors'),
    Promise = require('bluebird');

Promise.promisifyAll(Usuario);
Promise.promisifyAll(Distrito);
Promise.promisifyAll(Seccion);

exports.me = function (req, res) {
    Usuario
        .findOneAsync({_id: req.user._id}, '-salt -hashedPassword -ip -status', {})
        .then(function (user) {
            if (!user) {
                return res.json(401, {message: errors[401]});
            }
            res.json(200, user);
        }).catch(function () {
            return res.json(500, {message: errors[500]});
        });
};

exports.getPlanilla = function (req, res) {
    var sentence = {
        'candidato': function () {
            return ({candidato: req.user._id, rol: {$nin: ['representante de casilla', 'simpatizante']}});
        },
        'administrador': function () {
            return ({candidato: req.user.candidato, rol: {$nin: ['representante de casilla', 'simpatizante']}});
        },
        'representante general': function () {
            return ({rgeneral: req.user._id, rol: {$ne: 'simpatizante'}});
        },
        'representante de casilla': function () {
            return ({rcasilla: req.user._id});
        }
    }[req.user.rol]();
    if (req.query) {
        _.extend(sentence, req.query);
    }
    Usuario.findAsync(sentence, '-salt -hashedPassword -ip -expira -creado -actualizado -status', {}).then(function (users) {
        res.json(200, users);
    });
};

exports.update = function (req, res) {
    Usuario.findByIdAsync(req.user._id).then(function (user) {
        _.extend(user, req.body);
        user.save();
        res.status(200).end();
    }).catch(function () {
        return res.json(404, {message: errors[404]});
    });
};

exports.remove = function (req, res) {
    Usuario.findByIdAsync(req.params.id)
        .then(function (user) {
            if (_.isEqual(user.rol, 'administrador')) {
                return user.remove();
            }
            var sentence = {
                'representante general': function () {
                    return ({rgeneral: user._id});
                },
                'representante de casilla': function () {
                    return ({rcasilla: user._id});
                }
            }[user.rol]();
            return Usuario.removeAsync(sentence).then(function () {
                return user.remove();
            });
        }).then(function () {
            res.status(200).end();
        });
};