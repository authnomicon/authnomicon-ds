exports = module.exports = function(passwordVerifierFactory, directoryFactory, resolver, ds) {
  var Realm = require('../../lib/realms/realm');
  
  
  var api = {};
  
  api.resolve = function(name, type, cb) {
    if (typeof type == 'function') {
      cb = type;
      type = undefined;
    }
    type = type || 'D';
    
    resolver.resolve(name, function(err, config) {
      if (err) { return cb(err); }
      
      console.log(config);
      
      var realm = new Realm(name, config);
      realm._directoryFactory = directoryFactory;
      realm._passwordVerifierFactory = passwordVerifierFactory;
      return cb(null, realm);
    });
  };
  
  
  api.add = function(entity, realm, cb) {
    console.log('ADD ENTITY');
    console.log(entity)
    console.log(realm);
  }
  
  api.get = function(id, realm, cb) {
    console.log('GET ENTITY!');
    console.log(id);
    console.log(realm);
    
    api.resolve(realm, 'D', function(err, realm) {
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
    api.resolve(realm, 'PW', function(err, realm) {
      if (err) { return cb(err); }
      
      console.log('RESOLVED PW!');
      console.log(realm);
      
      ds.authenticate(realm._config.url, username, password, function(err, entity) {
        console.log('AUTHENTICATED!');
        console.log(err);
        console.log(entity);
      })
      
      
      /*
      var conn = api.createConnection(realm._config, function() {
        console.log('READY!');
      });
      */
      
      return;
      
      
      var pwver = realm.createPasswordVerifier(function() {
        pwver.verify(username, password, function(err, entity) {
          if (err) { return cb(err); }
          if (!entity) { return cb(null, false); }
          return cb(null, entity);
        });
      });
      
    });
  }
  
  api.createConnection = function(options, readyListener) {
    console.log('CREATE CONNECTION!');
    console.log(options);
  }
  
  
  return api;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/ds/realms';
exports['@singleton'] = true;
exports['@require'] = [
  './factory/passwordverifier',
  './factory/directory',
  './resolver',
  'http://schemas.authnomicon.org/js/ds'
];
