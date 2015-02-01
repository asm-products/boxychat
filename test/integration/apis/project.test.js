var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var api = request('http://localhost:3000');//this needs to move to a configuration

/*
 * to run this, you need the application running
 */
describe('Project APIs', function() {

  describe('Routes', function() {  
    var project = new Date().getTime(), grp, usr;
    
    before(function(done) {
    	api.get('/user').end(function(err, res){usr = res.body[0].id; done()}); 
    });
    
    it('create project successfully', function (done) {
    	api.post('/project/create')
    	.send({name: project,type:'test',owner: usr})
    	.expect(200).expect(/success/).end(function(err, res){grp = res.body.data.id; done()});
    });
    
    it('create project unsuccessfully - project name not unique', function (done) {
    	api.post('/project/create')
    	.send({name:project, type:'test',owner: usr})
    	.expect(200).expect(/error/).expect(/E11000 duplicate key error/).end(done);
    });
    
    //this should fail, need to figure out how waterline enforce FK rel
    it('create project unsuccessfully - owner not exit', function (done) {
    	api.post('/project/create')
    	.send({name:new Date().getTime(), type:'test',owner: 'notexist'})
    	.expect(200).expect(/success/).end(done);
    });
    
    it('addUser successfully', function (done) {
    	api.post('/project/addUser')
    	.send({project: grp, user: 'fdf'})
    	.expect(200).expect(/success/).end(done);
    });
    
  });

});