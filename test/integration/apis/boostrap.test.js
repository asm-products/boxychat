// process.env.NODE_ENV = "development";//make sure you use the same environment as your dev server

// var Waterline = require('waterline'),
// mongoAdapter = require('sails-mongo'),
// _ = require('lodash'),
// path = require('path'),
// baseModel = require('../../../lib/model'),
// requireAll = require('require-all'),
// config = require('../../../config/config'),
// assert = require('assert');

// var rootPath = path.normalize(__dirname + '../../../../api');
// var models = requireAll(rootPath + '/models');

// var waterline = new Waterline();

// before(function(done) {
			
// 	//Load models into waterline
// 	_(models).each(function (model) {
// 		waterline.loadCollection(Waterline.Collection.extend(new baseModel(model)));
// 	});
	
	
// 	waterline.initialize(config.orm, function(err, colls) {
// 		if (err) return done(err);
// 		query = colls.collections.user;						
// 		query.create({email:'test@test.com', password:'q1w2e3'}, function(err, obj){});				
// 		done();
// 	});
	
// });

// after(function(done) {
// 	waterline.teardown(done);
// });