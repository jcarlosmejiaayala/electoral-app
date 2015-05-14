'use strict';

var express = require('express'),
    config = require('../../config/enviroment'),
    passport = require('passport'),
    auth = require('../auth.service'),
    errors = require('../../components/errors'),
    router = express.Router(),
    _ = require('lodash'),
    Promise = require('bluebird'),
    Usuario = require('../../model/usuario');

Promise.promisifyAll(Usuario);

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info,
            token;
        if (error) {
            return res.json(401, {message: errors[401]});
        }
        if (!user) {
            return res.json(401, {message: 'Verifica nuevamente tus credenciales.'});
        }
        if (!user.status) {
            return res.json(401, {message: 'Su periodo de prueba ha caducado, favor pónganse en contacto con nosotros.'});
        }
        /*
         if (Date.now() > user.expira) {
         var idCandidato = (user.rol == 'candidato') ? user._id : user.candidato;
         return Usuario.updateAsync({$or: [{_id: idCandidato}, {candidato: idCandidato}]}, {$set: {status: false}}, {multi: true})
         .then(function () {
         return res.json(401, {message: 'Su periodo de prueba ha caducado, favor pónganse en contacto con nosotros.'});
         });
         }
         */
        if (user.rol != 'candidato') {
            return Usuario.findOneAsync({_id: user.candidato, rol: 'candidato'})
                .then(function (candidato) {
                    return response(user, candidato);
                });
        }
        response(user, user);
        function response(user, candidato) {
            token = auth.signToken(user._id);
            res.json({
                token: token, perfil: _.merge(user.perfil, {
                    candidato: {
                        puesto: candidato.candidatura,
                        nombre: candidato.nombre,
                        estado: candidato.estado,
                        municipio: candidato.candidatura == 'Alcaldia' ? candidato.municipio : void 0
                    }
                })
            });
        }
    })(req, res, next);
});

module.exports = router;