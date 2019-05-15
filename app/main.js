exports = module.exports = function(agent, utils, services) {
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
  
  api.get = function(url, id, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    var type = options.type;
    services.createConnection(type, { url: url }, function() {
      this.get(id, function(err, user) {
        if (err) { return cb(err); }
        return cb(null, user);
      });
    });
    
    return;
    
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    options.url = url;
    
    function onready() {
      conn.get(id, function(err, entity) {
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
  './agent',
  './utils',
  'http://i.bixbyjs.org/services'
];
