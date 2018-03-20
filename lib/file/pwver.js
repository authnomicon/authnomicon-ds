function FilePasswordVerifier(dir) {
  this._dir = dir;
}

FilePasswordVerifier.prototype.verify = function(username, password, cb) {
  this._dir.get(username, function(err, entry) {
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


module.exports = FilePasswordVerifier;
