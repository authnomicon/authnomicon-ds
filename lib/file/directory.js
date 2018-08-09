var decisions = require('decisions');
var clone = require('clone');


function FileDirectory(file) {
  var settings = decisions.createSettings();
  settings.load(file);
  this._settings = settings.toObject();
}

FileDirectory.prototype.get = function(id, cb) {
  if (typeof name == 'function') {
    cb = name;
    name = undefined;
  }
  
  var self = this;
  process.nextTick(function() {
    var entries = self._settings.entry || []
      , entry, i, len;
    for (i = 0, len = entries.length; i < len; ++i) {
      entry = entries[i];
      if (entry.id === id) { return cb(null, clone(entry)); }
    }
    return cb(new Error('Unknown entry: ' + id));
  });
};

FileDirectory.prototype.authenticate = function(username, password, cb) {
  this.get(username, function(err, entry) {
    if (err) { return cb(err); }
    if (!entry) { return cb(null, false); }
    
    // TODO: constant time compare
    // TODO: rename property to "password"? (no, if it needs to be shared.  otherwise yes)
    // TODO: add support for hashed passwords.
    if (entry.secret !== password) {
      return cb(null, false);
    }
    return cb(null, entry);
  });
};


module.exports = FileDirectory;
