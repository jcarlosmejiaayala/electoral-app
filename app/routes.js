'use strict';

module.exports = function(app){
  app.use('/api/usuario', require('./api/usuario'));
};