exports = module.exports = function(ldap) {
  var uri = require('url')
    , ldap = require('ldapjs')
    , LDAPPasswordVerifier = require('../../lib/ldap/pwver/bind');
  
  
  return {
    canCreate: function(options) {
      var url = options.url;
      if (!url) { return false; }
      
      url = uri.parse(url);
      if (url.protocol == 'ldap:' || url.protocol == 'ldaps:') { return true; }
      return false;
    },
    
    create: function(options) {
      var url = ldap.parseURL(options.url)
        , opts = {
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
      
      
      var client = ldap.createClient(opts);
      var adminClient = ldap.createClient(adminOpts);
      var verifier = new LDAPPasswordVerifier(client, adminClient, url.DN);
      return verifier;
    }
  };
};

exports['@name'] = 'ldap';
exports['@require'] = [
  'http://i.bixbyjs.org/ldap'
];
