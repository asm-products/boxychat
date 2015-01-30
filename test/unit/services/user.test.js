var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');

var user = require('../../../api/services/user.js');
Model = {};

describe("User services", function() {
   describe("findByEmail", function() {

       it("email not found", function() {
    	   Model.user = {
    				findByEmail: function(user, callback) {callback('err',{})}
    		};
    	   
           var email='test',cb,spy;
           cb = function(err, obj){};
           spy = cb = sinon.spy(cb);        
           user.findByEmail(email, cb);
           expect(spy.calledOnce);     
           expect(spy.args[0][0]).to.eql('err');
       });
       
       it("email found", function() {
    	   Model.user = {
    				findByEmail: function(user, callback) {callback(null,['user'])}
    		};
    	   
           var email='test',cb,spy;
           cb = function(err, obj){};
           spy = cb = sinon.spy(cb);        
           user.findByEmail(email, cb);
           expect(spy.calledOnce);     
           expect(spy.args[0][0]).to.eql(null);
           expect(spy.args[0][1]).to.eql(['user']);
       });

   });
});