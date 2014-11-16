'use strict';

var passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

exports.setup = function (Usuario, config) {
    passport.use(new localStrategy({
            user: 'email',
            password: 'password'
        },
        function (email, password, done) {
            Usuario.findOne({email: email.toLowerCase()},
                function (err, usuario) {
                    if (err)
                        return done(err);
                    if (!usuario)
                        return done(null, false, {message: 'usuario no registrado'});
                    if (!usuario.authenticate(password))
                        return done(null.false, {message: 'mala autenticacion'});
                    return done(null, usuario);
                });
        }
    ));
};