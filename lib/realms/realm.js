function Realm(name, config) {
  this.name = name;
  this.id = config.id;
  this._config = config;
}

Realm.prototype.createDirectory = function(readyListener) {
  var directory = this._directoryFactory.create(this._config);
  if (!directory) { throw new Error('Failed to create directory.'); }
  
  if (typeof directory.once == 'function') {
    directory.once('ready', readyListener);
  } else {
    process.nextTick(readyListener);
  }
  
  return directory;
};

Realm.prototype.createPasswordVerifier = function(readyListener) {
  var verifier = this._passwordVerifierFactory.create(this._config);
  if (typeof verifier.once == 'function') {
    verifier.once('ready', readyListener);
  } else {
    process.nextTick(readyListener);
  }
  
  return verifier;
};


module.exports = Realm;
