'use strict';

var controller = require('../lib/controller.js')
	,assert = require("assert")
	,chai = require('chai')
	,sinon = require('sinon')
	,sinonChai = require('sinon-chai')
	,should = chai.should();

chai.use(sinonChai);

describe('controller ', function() {

	it('should have actions property', function(){
		controller.should.have.property('actions');
	});
	
	it('should have sockets property', function(){
		controller.should.have.property('sockets');
	});

	before(function() {
		//spies, stubs, mocks can also go here if needing to setup before execution of all tests
		//sinon.stub(controller.actions, 'get /').yields("hello");
	});
	
	it('get / should find all models', function() {

		//example with a spy
		var model = sinon.spy();
		controller.actions['get /'](null, null, null);		//obviously fails here bc the model doesn't yet exist in your controller
		
		//normally would spy or stub out the model object, and set a default return value on find(). 
		//then verify it the stub was called corrrectly 
	});
	
	
});
