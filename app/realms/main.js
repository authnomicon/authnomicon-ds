exports = module.exports = function(resolver, ds) {
  var api = {};
  
  api.resolve = function(name, type, cb) {
    if (typeof type == 'function') {
      cb = type;
      type = undefined;
    }
    type = type || 'D';
    
    resolver.resolve(name, function(err, config) {
      if (err) { return cb(err); }
      return cb(null, config);
    });
  };
  
  
  api.add = function(entity, realm, cb) {
    api.resolve(realm, 'D', function(err, config) {
      if (err) { return cb(err); }
      ds.add(config.url, entity, cb);
    });
  };
  
  api.get = function(id, realm, cb) {
    api.resolve(realm, 'D', function(err, config) {
      if (err) { return cb(err); }
      ds.get(config.url, id, cb);
    });
  };
  
  // TODO: add, modify, delete
  
  api.authenticate = function(username, password, realm, cb) {
    api.resolve(realm, 'PW', function(err, config) {
      if (err) { return cb(err); }
      ds.authenticate(config.url, username, password, cb);
    });
  };
  
  return api;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/ds/realms';
exports['@singleton'] = true;
exports['@require'] = [
  './resolver',
  'http://schemas.authnomicon.org/js/ds'
];
