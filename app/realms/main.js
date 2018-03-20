exports = module.exports = function(resolver, passwordVerifierFactory, directoryFactory) {
  var Realm = require('../../lib/realms/realm');
  
  
  var api = {};
  
  api.resolve = function(name, cb) {
    resolver.resolve(name, function(err, config) {
      if (err) { return cb(err); }
      
      var realm = new Realm(name, config);
      realm._directoryFactory = directoryFactory;
      realm._passwordVerifierFactory = passwordVerifierFactory;
      return cb(null, realm);
    });
  };
  
  return api;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/ds/realms';
exports['@singleton'] = true;
exports['@require'] = [
  './resolver',
  '../ds/authentication/password/verifierfactory',
  '../ds/directory/factory'
];
