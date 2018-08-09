exports = module.exports = function(agent) {
  
  
  var api = {};
  
  api.authenticate = function(url, username, password, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    options.url = url;
    
    var name = agent.getName(options);
    
    var conn = agent._connections[name];
    if (conn) {
      
    } else {
      conn = agent.createConnection(options);
      agent.addConnection(conn);
      
      function onready() {
        conn.authenticate(username, password, function(err, entity) {
          if (err) { return cb(err); }
          if (!entity) { return cb(null, false); }
          return cb(null, entity);
        });
      }
      
      if (typeof conn.once == 'function') {
        conn.once('ready', onready);
      } else {
        process.nextTick(onready);
      }
    }
  }
  
  return api;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/ds';
exports['@singleton'] = true;
exports['@require'] = [
  './agent'
];
