exports = module.exports = function(agent) {
  
  
  var api = {};
  
  api.authenticate = function(url, username, password, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = undefined;
    }
    options = options || {};
    
    
    options.url = url;
    
    console.log('AUTHENTICATE!');
    console.log(url);
    
    var name = agent.getName(options);
    
    var conn = agent._connections[name];
    if (conn) {
      
    } else {
      conn = agent.createConnection(options);
      agent.addConnection(conn);
      
      console.log('CREATED CONNECTION!');
      
      /*
      var l = conn.location.parse(url);
      
      conn.once('ready', function() {
        conn.publish(l.topic, options, function(err) {
          if (err) { return cb(err); }
          return cb();
        });
      });
      */
    }
    
    /*
    api.resolve(realm, 'PW', function(err, realm) {
      if (err) { return cb(err); }
      
      console.log('RESOLVED PW!');
      console.log(realm);
      
      var conn = api.createConnection(realm._config, function() {
        console.log('READY!');
      });
      
    });
    */
    
    
  }
  
  return api;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/ds';
exports['@singleton'] = true;
exports['@require'] = [
  './agent'
];
