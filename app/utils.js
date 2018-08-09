exports.getConnection = function(agent, options) {
  var name = agent.getName(options);
  var conn = agent._connections[name];
  if (conn) {
    
  } else {
    conn = agent.createConnection(options);
    agent.addConnection(conn);
    return conn;
  }
}
