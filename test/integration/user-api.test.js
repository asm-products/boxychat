var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');
var api = request('http://localhost:3000');//this needs to move to a configuration

describe('UserController', function() {

  describe('Routes', function() {
    it('Welcome to Boxychat', function (done) {
    	api.get('/').expect(200).expect('Welcome to Boxychat!').end(done);
    	
      //api.get('/').expect(500).expect('body', 'Hello world!');
      
      //  .send({ name: 'test', password: 'test' })
      //  .expect(302)
      //  .expect('location','/mypage', done);
      
      //done();
    });
    
    it('User email address not exist', function (done) {
    	api.get('/user/forgotpassword').expect(200).expect(/error/).expect(/Email_Address_Not_Exist/).end(done);
    });
    
  });

});