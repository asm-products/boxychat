process.env.NODE_ENV = "test";

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

describe('Collection user', function () {
	describe('.create() .find()', function () {
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
				done();
			});
		});
		
		it('should create one user', function (done) {
			query.create({email:'test@test.com', password:'q1w2e3'}, function(err, obj){
				query.find().exec(function(err, obj){
					console.log(obj);
				})
			});
			
			query.find().exec(function (err, obj) {
				if(err) {console.log(err); return done(err);}
				console.log(obj);
				done();
			});
		});
		
		
		
	});
});