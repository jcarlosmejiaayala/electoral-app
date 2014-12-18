'use strict';

var passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

exports.setup = function (user) {
    passport.use(new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            user.findOne({email: email.toLowerCase()},
                function (err, usuario) {
                    if (err) {
                        return done(err);
                    }
                    if (!usuario) {
                        return done(null, false, {message: 'usuario no registrado'});
                    }
                    return done(null, usuario);
                });
        }
    ));
};