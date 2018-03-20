var EventEmitter = require('events');
var decisions = require('decisions');
var clone = require('clone');
var util = require('util');


function FileResolver(file) {
  EventEmitter.call(this);
  
  var settings = decisions.createSettings();
  settings.load(file);
  this._settings = settings.toObject();
  
  var self = this;
  process.nextTick(function() {
    self.emit('ready');
  });
}

util.inherits(FileResolver, EventEmitter);

FileResolver.prototype.resolve = function(name, cb) {
  if (typeof name == 'function') {
    cb = name;
    name = undefined;
  }
  
  var self = this;
  process.nextTick(function() {
    var realms = self._settings.realms || []
      , realm, i, len;
    for (i = 0, len = realms.length; i < len; ++i) {
      realm = realms[i];
      if (realm.name === name) { return cb(null, clone(realm)); }
    }
    return cb(new Error('Unknown realm: ' + name));
  });
};


module.exports = FileResolver;
