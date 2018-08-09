var uri = require('url')
  , FileDirectory = require('../../lib/file/directory');


exports.createConnection = function(options) {
  if (typeof options == 'string') {
    options = { url: options };
  }
  
  url = uri.parse(options.url);
  if (url.protocol !== 'file:') { return; }
  return new FileDirectory(url.pathname);
};

exports.getName = function(options) {
  return 'TODO'
};

