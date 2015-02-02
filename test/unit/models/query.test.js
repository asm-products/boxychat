process.env.NODE_ENV = "test";

var Waterline = require('waterline'),
mongoAdapter = require('sails-mongo'),
_ = require('lodash'),
path = require('path'),
baseModel = require('../../../lib/model'),
requireAll = require('require-all'),
config = require('../../../config/config'),
chai = require('chai'),
expect = chai.expect;

var rootPath = path.normalize(__dirname + '../../../../api');
var models = requireAll(rootPath + '/models');

describe('Collection user', function () {
	
	describe('.create() .find()', function () {
		//var query;
		/*before(function (done) {
			var waterline = new Waterline();	
			var Base = function (model) {
			    return _.extend({
			        connection: 'test'
			    }, model);
			};
			
			//Load models into waterline
			_(models).each(function (model) {
				waterline.loadCollection(Waterline.Collection.extend(new Base(model)));
			});
					
			waterline.initialize(config.orm, function(err, colls) {
				if (err) return done(err);
				query = colls.collections.user;				
				done(); 
			});
			
		});*/
		
		it('should create one user', function (done) {
			query.create({email:'test@test.com', password:'q1w2e3'}, function(err, obj){
				if(err) done(err);
				expect(obj).to.not.be.undefined;
				expect(obj).to.not.be.empty;
				expect(obj.email).to.equal('test@test.com');
			});
			
			query.find().exec(function (err, obj) {
				if(err) {return done(err);}
				expect(obj).to.not.be.empty;
				done();
			});
		});
		
	});
});