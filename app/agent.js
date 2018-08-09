exports = module.exports = function(IoC, logger) {
  var Agent = require('../lib/agent');
  
  
  var agent = new Agent();
  
  return Promise.resolve(agent)
    .then(function(agent) {
      var components = IoC.components('http://schemas.authnomicon.org/js/ds/ProtocolPlugIn');
    
      return Promise.all(components.map(function(c) { return c.create(); } ))
        .then(function(plugins) {
          plugins.forEach(function(plugin, i) {
            logger.info('Loaded directory access protocol: ' + components[i].a['@protocol']);
            agent.use(plugin);
          });
        })
        .then(function() {
          return agent;
        });
    })
    .then(function(agent) {
      return agent;
    });
}

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
