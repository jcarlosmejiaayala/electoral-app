'use strict';
var errors = require('./components/errors');

module.exports = function (app) {
    app.use('/usuario', require('./api/usuario'));
    app.use('/estados', require('./api/estados'));
    app.use('/auth', require('./auth'));
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);
    app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};