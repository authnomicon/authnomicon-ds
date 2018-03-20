// TODO: Create password verifier that can directly compare crypted passwords
// https://github.com/mcavage/node-ldapjs/issues/184
// https://github.com/mcavage/node-ldapjs/issues/310
//var ssha = require('openldap_ssha');

/*
var ssha = require('ssha');
var ssha256 = require('node-ssha256');
console.log(password);
var pw = ssha.create(password);
console.log('PW IS: ' + pw);
var pw = ssha256.create(password);
console.log('PW IS: ' + pw);
*/

// http://www.openldap.org/faq/data/cache/344.html
// http://www.openldap.org/faq/data/cache/346.html
// https://linux.die.net/man/8/slappasswd
// https://linux.die.net/man/1/sslpasswd
// https://redpill-linpro.com/techblog/2016/08/16/ldap-password-hash.html
// http://stackoverflow.com/questions/37357097/how-to-check-crypt3-sha512-password
// https://tools.ietf.org/id/draft-stroeder-hashed-userpassword-values-01.html

/*
var crypt = require('crypt3/async');

// https://github.com/sendanor/node-crypt3/issues/13

//crypt('K8LP7TdqJfZkbD', '$6$ced2974edd507582$w1I/', function(err, value) {
//crypt('pass', 'salt', function(err, value) {
crypt('K8LP7TdqJfZkbD', '$6$ced2974edd507582', function(err, value) {
  console.log('CRYPTED!');
  console.log(err);
  console.log(value)
});

crypt('pass', 'sa5JEXtYx/rm6', function(err, value) {
  console.log('CRYPTED ?!');
  console.log(err);
  console.log(value)
});

crypt('K8LP7TdqJfZkbD', crypt.createSalt('md5'), function(err, value) {
  console.log('CRYPT MD5');
  console.log(err);
  console.log(value)
});

crypt('K8LP7TdqJfZkbD', crypt.createSalt('blowfish'), function(err, value) {
  console.log('CRYPT Blowfish');
  console.log(err);
  console.log(value)
});

crypt('K8LP7TdqJfZkbD', crypt.createSalt('sha256'), function(err, value) {
  console.log('CRYPT SHA 256');
  console.log(err);
  console.log(value)
  console.log(crypt.createSalt('sha256'))
  console.log(crypt.createSalt('sha256'))
});

crypt('K8LP7TdqJfZkbD', '$5$KMlQB6dATkEhtw', function(err, value) {
  console.log('CRYPT SHA 256 X1');
  console.log(err);
  console.log(value)
  console.log(crypt.createSalt('sha256'))
  console.log(crypt.createSalt('sha256'))
});

crypt('K8LP7TdqJfZkbD', '$5$0gR6aU6Z7WTuvg', function(err, value) {
  console.log('CRYPT SHA 256 X2');
  console.log(err);
  console.log(value)
  console.log(crypt.createSalt('sha256'))
  console.log(crypt.createSalt('sha256'))
});

crypt('K8LP7TdqJfZkbD', crypt.createSalt('sha512'), function(err, value) {
  console.log('CRYPT SHA 512');
  console.log(err);
  console.log(value)
});

//connection.compare(userDN, 'userPassword', pw, function(err, matched) {
connection.compare(userDN, 'userPassword', pw, function(err, matched) {
//connection.compare(userDN, 'homeDirectory', '/home/jared.hanson', function(err, matched) {
  console.log('COMPARED!');
  console.log(err);
  
  //assert.ifError(err);

  console.log('matched: ' + matched);
});
*/
