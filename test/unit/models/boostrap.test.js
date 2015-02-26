process.env.NODE_ENV = "test";//make sure you use the same environment as your test server

var Waterline = require('waterline'),
mongoAdapter = require('sails-mongo'),
_ = require('lodash'),
path = require('path'),
baseModel = require('../../../lib/model'),
requireAll = require('require-all'),
testConfig = require('../../../config/tiers/test.js'),
assert = require('assert');

var rootPath = path.normalize(__dirname + '../../../../api');
var models = requireAll(rootPath + '/models');

var waterline = new Waterline();

before(function(done) {
			
	var Base = function (model) {
	    return _.extend({
	        connection: 'test'
	    }, model);
	};
	
	//Load models into waterline
	_(models).each(function (model) {
		waterline.loadCollection(Waterline.Collection.extend(new Base(model)));
	});
	
	
	waterline.initialize(testConfig.orm, function(err, colls) {
		if (err) return done(err);
		query = colls.collections.user;								
		done();
	});
	
});

after(function(done) {
	waterline.teardown(done);
	  //;
});