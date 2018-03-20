exports = module.exports = function(IoC, ldap, file, logger) {
  var Factory = require('fluidfactory');
  
  // TODO: Implement a local directory
  // dscl /Local/Default -authonly username password
  
  
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
      var components = IoC.components('http://schemas.authnomicon.org/js/ds/DirectoryProvider');
      
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(providers) {
          providers.forEach(function(provider, i) {
            logger.info('Loaded directory provider: ' + components[i].a['@name']);
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
  '../plugins/ldap/directory',
  '../plugins/file/directory',
  'http://i.bixbyjs.org/Logger'
];
