function Agent() {
  this._protos = [];
  this._connections = {};
}

Agent.prototype.use = function(proto) {
  this._protos.push(proto)
}

Agent.prototype.createConnection = function(options, readyListener) {
  if (typeof options == 'string') {
    options = { url: options };
  }
  
  var protos = this._protos
    , proto, conn, i, len;
  for (i = 0, len = protos.length; i < len; ++i) {
    proto = protos[i];
    conn = proto.createConnection(options);
    if (conn) {
      if (readyListener) { conn.on('ready', readyListener); }
      return conn;
    }
  }
  
  // TODO: only show protocol, host here (strip password/tokens)
  throw new Error('Unsupported directory access service: ' + options.url);
}

Agent.prototype.getName = function(options) {
  var protos = this._protos
    , proto, name, i, len;
  for (i = 0, len = protos.length; i < len; ++i) {
    proto = protos[i];
    name = proto.getName(options);
    if (name) {
      return name;
    }
  }
  
  // TODO: only show protocol, host here
  throw new Error('Unsupported directory access service: ' + options.url);
}


module.exports = Agent;
