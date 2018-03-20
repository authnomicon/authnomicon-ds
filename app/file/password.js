exports = module.exports = function() {
  var uri = require('url')
    , FileDirectory = require('../../lib/file/directory')
    , FilePasswordVerifier = require('../../lib/file/pwver')
  
  
  return {
    canCreate: function(options) {
      if (typeof options == 'string') {
        options = { url: options };
      }
      
      var url = options.url;
      if (!url) { return false; }
      
      url = uri.parse(url);
      if (url.protocol == 'file:') { return true; }
      return false;
    },
    
    create: function(options) {
      if (typeof options == 'string') {
        options = { url: options };
      }
      
      var url = uri.parse(options.url);
      // TODO: Make a global cache of these things, and return shared instances
      //       if the file is loaded multiple times (share this with the file directory)
      var dir = new FileDirectory(url.pathname);
      return new FilePasswordVerifier(dir);
    }
  };
};

exports['@name'] = 'file';
exports['@require'] = [];
