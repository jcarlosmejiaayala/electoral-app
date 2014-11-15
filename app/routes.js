'use strict';

module.exports = function (app) {
    //app.use('/api/usuario', require('./api/usuario'));
    app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};