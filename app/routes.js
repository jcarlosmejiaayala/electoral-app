'use strict';

module.exports = function(app){
  app.use('/api/usuarios', require('./api/usuarios'));
};