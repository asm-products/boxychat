var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var api = request('http://localhost:3000');//this needs to move to a configuration

/*
 * to run this, you need the application running
 */
describe('GroupController', function() {

  describe('Routes', function() {  
    var group = new Date().getTime();
    var owner = '54cbffc5d728946c0fe9e3af';
    var grp;
    var usr;
    before(function(done) {
    	api.get('/user').end(function(err, res){usr = res.body[0].id; done()}); 
    });
    
    it('create successfully', function (done) {
    	api.post('/group/create')
    	.send({name: group,type:'test',owner: usr, project: 'dsdsd'})
    	.expect(200).expect(/success/).end(function(err, res){grp = res.body.data.id; done()});
    });
    
    it('create unsuccessfully - project name not unique', function (done) {
    	api.post('/group/create')
    	.send({name:group, type:'test',owner: usr, project: 'dsdsd'})
    	.expect(200).expect(/error/).expect(/E11000 duplicate key error/).end(done);
    });
    
    it('create unsuccessfully - owner not exit', function (done) {
    	api.post('/group/create')
    	.send({name:new Date().getTime(), type:'test',owner: 'notexist', project: 'dsdsd'})
    	.expect(200).expect(/error/).end(done);
    });
    
    it('addUser successfully', function (done) {
    	api.post('/group/addUser')
    	.send({group: grp, user: 'fdf'})
    	.expect(200).expect(/success/).end(done);
    });
    
  });

});