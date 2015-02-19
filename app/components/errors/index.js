'use strict';

exports[400] = "Tu solicitud no fue procesada.";
exports[401] = "No autorizado";
exports[404] = function (req, res) {
    res.json(404, {message: 'Recurso no encontrado.'});
};
exports[500] = "Error interno del servidor.";
