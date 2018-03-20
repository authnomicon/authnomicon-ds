exports = module.exports = function() {
  var uri = require('url')
    , FileDirectory = require('../../lib/file/directory');
  
  
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
      //       if the file is loaded multiple times
      return new FileDirectory(url.pathname);
    }
  };
};

exports['@name'] = 'file';
exports['@require'] = [];
