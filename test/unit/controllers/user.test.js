var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');

var user = require('../../../api/controllers/user.js');
Model = {};
Model.user = {
		find: function() { return {exec: function(callback){return callback}}},
		create: function(user, callback) {callback({},{})}
};
describe("Routes", function() {
   describe("say hello", function() {

       it("should say hello", function() {
           var req,res,spy;
           req = res = {};
           spy = res.send = sinon.spy();        
           user.actions['get /hello'](req, res);
           expect(spy.calledOnce);           
           assert(spy.args[0][0] == 'Hello world!');
       });

   });
});