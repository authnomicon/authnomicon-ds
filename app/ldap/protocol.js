exports = module.exports = function(LDAP, X500) {
  var uri = require('url')
    , ldap = require('ldapjs')
    , LDAPPasswordVerifier = require('../../lib/ldap/pwver/bind');
  
  
  return {
    createConnection: function(options) {
      if (typeof options == 'string') {
        options = { url: options };
      }
      
      var url = uri.parse(options.url);
      if (!(url.protocol == 'ldap:' || url.protocol == 'ldaps:')) { return; }
      
      url = ldap.parseURL(options.url)
      var opts = {
          url: options.url
        }
      , adminOpts = {
          url: options.url
        };
  
      if (url.extensions && url.extensions.indexOf('bindname=') == 0) {
        adminOpts.bindDN = url.extensions.slice('bindname='.length);
    
        // inspired by https://docs.oracle.com/cd/E19424-01/820-4809/gcyel/index.html
        // LDAP_ADMIN_PASSWORD
        adminOpts.bindCredentials = process.env['LDAP_ADMIN_PASSWORD'];
      }
    
    
      var client = LDAP.createClient(opts);
      var adminClient = LDAP.createClient(adminOpts);
      var verifier = new LDAPPasswordVerifier(client, adminClient, url.DN, X500);
      return verifier;
    },
    
    getName: function(options) {
      return 'TODO';
    }
  };
};

exports['@name'] = 'ldap';
exports['@require'] = [
  'http://i.bixbyjs.org/ldap',
  'http://i.bixbyjs.org/x500'
];
