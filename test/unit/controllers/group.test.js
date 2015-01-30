var sinon = require('sinon');
var chai = require('chai');
var assert = require('assert');
var expect = chai.expect;

var group = require('../../../api/controllers/group.js');
Model = {};

describe("Group", function() {
   describe("create group", function() {

       it("should generate error", function() {
    	   Model.group = {
    				create: function(group, callback) {callback(1, [])}
    	   };
    	   
           var req,res, next, spy;
           req = res = next = {};
           req.param = function(v) {return v;};
           spy = res.json = sinon.spy();        
           group.actions['post /group/create'](req, res, next);
           expect(spy.calledOnce);           
           assert(spy.args[0][0].status === 'error');
           
       });
       
       it("should generate success", function() {
    	   Model.group = {
    				create: function(group, callback) {callback(false, {name:'test'})}
    	   };
    	   
    	   Model.user = {
    				findOne: function(user, callback) {callback(false, {groups:[], save: function(){}})}
    		};
    	   
           var req,res, next, spy;
           req = res = next = {};
           req.param = function(v) {return v;};
           spy = res.json = sinon.spy();        
           group.actions['post /group/create'](req, res, next);
           expect(spy.calledOnce);           
           assert(spy.args[0][0].status === 'success');
           
       });

   });
});