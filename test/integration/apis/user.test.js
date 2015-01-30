process.env.NODE_ENV = "development";//make sure you use the same environment as your test server

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

var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var api = request('http://localhost:3000');//this needs to move to a configuration

/*
 * to run this, you need the application running
 */
describe('UserController', function() {

  describe('Routes', function() {
	  var query;
	  
	  before(function (done) {
			var waterline = new Waterline();		
			
			//Load models into waterline
			_(models).each(function (model) {
				waterline.loadCollection(Waterline.Collection.extend(new baseModel(model)));
			});
					
			waterline.initialize(config.orm, function(err, colls) {
				if (err) return done(err);
				query = colls.collections.user;						
				query.create({email:'test@test.com', password:'q1w2e3'}, function(err, obj){});				
				done();
			});
			
			
		});  
	  
	  
    it('Welcome to Boxychat', function (done) {
    	api.get('/').expect(200).expect('Welcome to Boxychat!').end(done);
    	
      //api.get('/').expect(500).expect('body', 'Hello world!');
      
      //  .send({ name: 'test', password: 'test' })
      //  .expect(302)
      //  .expect('location','/mypage', done);
      
      //done();
    });
    
    it('forgotpassword - user email address not exist', function (done) {
    	api.post('/user/forgotpassword').expect(200).expect(/error/).expect(/Email_Address_Not_Exist/).end(done);
    });
    
    it('forgotpassword - user email address exists', function (done) {
    	api.post('/user/forgotpassword').send({email:'test@test.com'})
    	.expect(200).expect(/success/).expect(/access_token/).end(done);
    });
    
  });

});