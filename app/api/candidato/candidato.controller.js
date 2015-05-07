'use strict';

var Candidato = require('../../model/candidato'),
    Casilla = require('../../model/casilla'),
    Distrito = require('../../model/distrito'),
    Seccion = require('../../model/seccion'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Candidato);
Promise.promisifyAll(Casilla);
Promise.promisifyAll(Distrito);
Promise.promisifyAll(Seccion);

function getSecciones(candidato) {
    return new Promise(function (resolve) {
        resolve([{
            numero: candidato.distrito.numero,
            secciones: _.range(candidato.distrito.secciones.min, _.parseInt(candidato.distrito.secciones.max) + 1)
        }]);
    });
}

function setCandidato(request) {
    return new Promise(function (resolve, reject) {
        var candidato = new Candidato(request.body);
        candidato.status = true;
        candidato.ip = request.ip;
        candidato.acceptTerminos = true;
        candidato.save(function (err, user) {
            if (err) {
                return reject();
            }
            resolve(user);
        });
    });
}

function setDistritosAndSecciones(idUser, distritos) {
    _.forEach(distritos, function (distrito) {
        distrito.secciones = _(distrito.secciones).chain().map(function (seccion) {
            return (seccion.inicial == seccion.final) ? _.range(seccion.inicial, _.parseInt(seccion.final) + 1) : [_.parseInt(seccion.inicial)];
        }).union().flatten().value();
    });
    var mapDistritos = _.map(distritos, function (distrito) {
        return Distrito.createAsync({
            numero: distrito.numero,
            candidato: idUser
        }).then(function (resultDistrito) {
            return Promise.map(distrito.secciones, function (seccion) {
                return Seccion.createAsync({
                    numero: seccion,
                    candidato: idUser,
                    distrito: resultDistrito._id
                });
            });
        });
    });
    return Promise.all(mapDistritos);
}

exports.create = function (req, res) {
    setCandidato(req).then(function (user) {
        return [user, setDistritosAndSecciones(user._id, req.body.distritos)]
    }).spread(function (user) {
        var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60 * 5});
        res.json(200, {
            token: token, perfil: _.merge(user.perfil, {
                candidato: {
                    puesto: user.candidatura,
                    nombre: user.nombre,
                    estado: user.estado
                }
            })
        });
    }).catch(function () {
        return res.json(500, {message: errors[500]});
    });
};