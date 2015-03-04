'use strict';

var passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

exports.setup = function (Usuario) {
    passport.use(new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            Usuario.findOne({email: email.toLowerCase()},
                function (err, usuario) {
                    if (err) {
                        return done(err);
                    }
                    if (!usuario) {
                        return done(null, false, {message: 'Usuario no registrado.'});
                    }
                    if (!usuario.authenticate(password)) {
                        return done(null, false, {message: 'La contraseña es incorrecta.'});
                    }
                    return done(null, usuario);
                });
        }
    ));
};