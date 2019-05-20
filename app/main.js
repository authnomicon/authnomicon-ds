exports = module.exports = function(IoC, agent, utils, connect, services) {
  
  var modules = IoC.components('http://i.authnomicon.org/js/ds/IDirectoryService')
    , services = modules.map(function(m) { return m.a['@name']; });
  
  
  var api = {};
  
  api.add = function(url, entity, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    options.url = url;
    
    function onready() {
      conn.add(entity, function(err, entity) {
        if (err) { return cb(err); }
        return cb(null, entity);
      });
    }
    
    var conn = utils.getConnection(agent, options);
    if (typeof conn.once == 'function') {
      conn.once('ready', onready);
    } else {
      process.nextTick(onready);
    }
  };
  
  // TODO: if realm is an argument, resolve it to a specific service, and proceed with that.
  api.get = function(id, cb) {
    connect(services, function(err, conn) {
      if (err) { return cb(err); }
      conn.get(id, function(err, user) {
        if (err) { return cb(err); }
        return cb(null, user);
      });
    });
  };
  
  api.authenticate = function(url, username, password, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    options.url = url;
    
    function onready() {
      conn.authenticate(username, password, function(err, entity) {
        if (err) { return cb(err); }
        if (!entity) { return cb(null, false); }
        return cb(null, entity);
      });
    }
    
    var conn = utils.getConnection(agent, options);
    if (typeof conn.once == 'function') {
      conn.once('ready', onready);
    } else {
      process.nextTick(onready);
    }
  };
  
  return api;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/ds';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './agent',
  './utils',
  'http://i.bixbyjs.org/ns/connect',
  'http://i.bixbyjs.org/services'
];
