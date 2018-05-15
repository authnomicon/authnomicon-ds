exports = module.exports = function(passwordVerifierFactory, directoryFactory, resolver) {
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
  
  
  api.get = function(id, realm, cb) {
    console.log('GET ENTITY!');
    console.log(id);
    console.log(realm);
    
    api.resolve(realm, function(err, realm) {
      if (err) { return cb(err); }
      
      var dir = realm.createDirectory(function() {
        dir.get(id, function(err, entity) {
          if (err) { return cb(err); }
          return cb(null, entity);
        });
      });
    });
  };
  
  // TODO: add, modify, delete
  
  api.authenticate = function(username, password, realm, cb) {
    api.resolve(realm, function(err, realm) {
      if (err) { return cb(err); }
      
      var pwver = realm.createPasswordVerifier(function() {
        pwver.verify(username, password, function(err, entity) {
          if (err) { return cb(err); }
          if (!entity) { return cb(null, false); }
          return cb(null, entity);
        });
      });
    });
  }
  
  return api;
};

exports['@implements'] = [
  'http://schemas.authnomicon.org/js/ds/realms',
  'http://schemas.modulate.io/js/aaa/realms' // TODO: remove this
];
exports['@singleton'] = true;
exports['@require'] = [
  './factory/passwordverifier',
  './factory/directory',
  './resolver'
];
