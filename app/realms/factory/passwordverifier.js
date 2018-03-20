exports = module.exports = function(IoC, ldap, file, logger) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  function create(provider) {
    return function(options) {
      if (provider.canCreate(options)) {
        return provider.create(options);
      }
    };
  }
  
  return Promise.resolve(factory)
    .then(function(factory) {
      var components = IoC.components('http://schemas.authnomicon.org/js/ds/authentication/password/VerifierProvider');
  
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(providers) {
          providers.forEach(function(provider, i) {
            logger.info('Loaded password verifier provider: ' + components[i].a['@name']);
            factory.use(create(provider));
          });
          
          factory.use(create(ldap));
          factory.use(create(file));
        })
        .then(function() {
          return factory;
        });
    })
    .then(function(factory) {
      return factory;
    });
};

exports['@require'] = [
  '!container',
  '../../ldap/password',
  '../../file/password',
  'http://i.bixbyjs.org/Logger'
];
