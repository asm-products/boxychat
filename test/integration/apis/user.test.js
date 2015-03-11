/*process.env.NODE_ENV = "development";//make sure you use the same environment as your test server

var Waterline = require('waterline'),
mongoAdapter = require('sails-mongo'),
_ = require('lodash'),
path = require('path'),
baseModel = require('../../../lib/model'),
requireAll = require('require-all'),
config = require('../../../config/config'),
assert = require('assert');

var rootPath = path.normalize(__dirname + '../../../../api');
var models = requireAll(rootPath + '/models');
*/

var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var app = require('../../utils').app;
var api = request(app);//this needs to move to a configuration
/*
 * to run this, you need the application running
 */
describe('User APIs', function() {

  describe('Routes', function() {
	  var query;  
	  
	 this.timeout(5000);

    it('forgotpassword - user email address not exist', function (done) {
    	api.post('/user/forgotpassword').expect(200).expect(/error/).expect(/Email_Address_Not_Exist/).end(done);
    });
    
    it('forgotpassword - user email address exists', function (done) {
    	api.post('/user/forgotpassword').send({email:'test@test.com'})
    	.expect(200).expect(/success/).expect(/access_token/).end(done);
    });
    
    it('passwordReset - user email address not exists', function (done) {
    	api.post('/user/passwordReset').send({email:'notexist@test.com'})
    	.expect(500).expect(/err/).end(done);
    });
    
    it('passwordReset - user email address exists', function (done) {
    	api.post('/user/passwordReset').send({email:'test@test.com', password:'q1w2e3'})
    	.expect(200).expect(/success/).end(done);
    });
    
  });

});