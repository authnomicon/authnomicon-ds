exports = module.exports = function(agent, utils) {
  var api = {};
  
  api.get = function(url, id, options, cb) {
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
  }
  
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
  }
  
  return api;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/ds';
exports['@singleton'] = true;
exports['@require'] = [
  './agent',
  './utils'
];
