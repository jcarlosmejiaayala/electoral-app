'use strict';

module.exports = function (app) {
    app.use('/usuario', require('./api/usuario'));
    app.use('/estados', require('./api/estados'));
    app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};