'use strict';

module.exports = function (app) {
    app.use('/candidato', require('./api/candidato'));
    app.use('/administrador', require('./api/administrador'));
    app.use('/representante-general', require('./api//representante-general'));
    app.use('/usuario', require('./api/usuario'));
    app.use('/estados', require('./api/estados'));
    app.use('/casilla', require('./api/casilla'));
    app.use('/menu', require('./api/menu'));
    app.use('/auth', require('./auth'));
    app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(function (req, res) {
        res.json(404, {message: require('./components/errors')[404]});
    });
    app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};