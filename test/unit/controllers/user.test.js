var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var user = require('../../../api/controllers/user.js');
Model = {};
Model.user = {find: function() { return {exec: function(callback){return callback}}}};
describe("Routes", function() {
   describe("say hello", function() {

       it("should respond", function() {
           var req,res,spy;

           req = res = {};
           spy = res.send = sinon.spy();        
           user.actions['get /hello'](req, res);
           expect(spy.calledOnce);           
           expect(spy.args[0], 'Hello world!');
       });

   });
});