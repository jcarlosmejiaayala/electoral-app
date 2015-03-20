'use strict';

var express = require('express'),
    config = require('../../config/enviroment'),
    passport = require('passport'),
    auth = require('../auth.service'),
    errors = require('../../components/errors'),
    router = express.Router(),
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
        if(!user.status){
            return res.json(401, {message: 'Su periodo de prueba ha caducado, favor pónganse en contacto con nosotros.'});
        }

        if (user.expira > Date.now()) {
            var idCandidato = (user.rol == 'candidato')? user._id: user.candidato;
            return Usuario.updateAsync({$or:[{_id: idCandidato }, {candidato: idCandidato}]}, {$set:{status: false}}, {multi: true})
                .then(function(){
                   return res.json(401, {message: 'Su periodo de prueba ha caducado, favor pónganse en contacto con nosotros.'});
                });
        }
        token = auth.signToken(user._id);
        res.json({token: token, perfil: user.perfil});
    })(req, res, next);
});

module.exports = router;