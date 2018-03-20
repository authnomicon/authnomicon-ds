exports = module.exports = function(ldap) {
  var uri = require('url')
    , ldap = require('ldapjs')
    , LDAPDirectory = require('../../lib/ldap/directory');
  
  
  return {
    canCreate: function(options) {
      var url = options.url;
      if (!url) { return false; }
      
      url = uri.parse(url);
      if (url.protocol == 'ldap:' || url.protocol == 'ldaps:') { return true; }
      return false;
    },
    
    // https://tools.ietf.org/html/rfc2255
    // https://www.ldap.com/ldap-urls
    create: function(options) {
      var url = ldap.parseURL(options.url)
        , opts = {
            url: options.url
          };
      
      if (url.extensions && url.extensions.indexOf('bindname=') == 0) {
        opts.bindDN = url.extensions.slice('bindname='.length);
        
        // inspired by https://docs.oracle.com/cd/E19424-01/820-4809/gcyel/index.html
        // LDAP_ADMIN_PASSWORD
        opts.bindCredentials = process.env['LDAP_ADMIN_PASSWORD'];
      }
      
      var client = ldap.createClient(opts);
      var directory = new LDAPDirectory(client, url.DN);
      return directory;
    }
  };
};

exports['@name'] = 'ldap';
exports['@require'] = [
  'http://i.bixbyjs.org/ldap'
];
