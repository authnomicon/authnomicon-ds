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


module.exports = FileDirectory;
