var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');

var chat = require('../../../api/services/chat.js');
Model = {};

describe("Chat services", function() {
    describe("getContacts", function() {
        it("Return user contacts when there is at least 1 group and 1 user", function(done) {
            Model.group = {
               find: function(user) { return new Promise(function(res, rej){return res(groups)});}
            };
            Model.user = {
                find: function(user) { return new Promise(function(res, rej){return res(users)});}
            };

            chat.getContacts(1, function(err, res) {
                expect(err).to.be.null;
                expect(res).to.be.an('object');
                expect(res.groups).to.have.length(1);
                expect(res.users).to.have.length(1);
                done();
            });
        });

        it("Return user contacts when there are no groups but at least 1 user", function(done) {
            Model.group = {
               find: function(user) { return new Promise(function(res, rej){return res([])});}
            };
            Model.user = {
                find: function(user) { return new Promise(function(res, rej){return res(users)});}
            };

            chat.getContacts(1, function(err, res) {
                expect(err).to.be.null;
                expect(res).to.be.an('object');
                expect(res.groups).to.have.length(0);
                expect(res.users).to.have.length(1);
                done();
            });
        });

        it("Return user contacts when there are no users but at least 1 group", function(done) {
            Model.group = {
               find: function(user) { return new Promise(function(res, rej){return res(groups)});}
            };
            Model.user = {
                find: function(user) { return new Promise(function(res, rej){return res([])});}
            };

            chat.getContacts(1, function(err, res) {
                expect(err).to.be.null;
                expect(res).to.be.an('object');
                expect(res.groups).to.have.length(1);
                expect(res.users).to.have.length(0);
                done();
            });
        });

        it("Return user contacts when there are no groups and no users", function(done) {
            Model.group = {
               find: function(user) { return new Promise(function(res, rej){return res([])});}
            };
            Model.user = {
                find: function(user) { return new Promise(function(res, rej){return res([])});}
            };

            chat.getContacts(1, function(err, res) {
                expect(err).to.be.null;
                expect(res).to.be.an('object');
                expect(res.groups).to.have.length(0);
                expect(res.users).to.have.length(0);
                done();
            });
        });

        it("Return an error when the group model returns an error", function(done) {
            Model.group = {
               find: function(user) { return new Promise(function(res, rej){return rej(new Error("Provoked error group"))});}
            };
            Model.user = {
                find: function(user) { return new Promise(function(res, rej){return res([])});}
            };

            chat.getContacts(1, function(err, res) {
                expect(err).to.be.an('object');
                expect(res).to.be.undefined;
                expect(err.message).to.be.equal('Provoked error group');
                done();
            });
        });

        it("Return an error when the user model returns an error", function(done) {
            Model.group = {
               find: function(user) { return new Promise(function(res, rej){return res([])});}
            };
            Model.user = {
                find: function(user) { return new Promise(function(res, rej){return rej(new Error("Provoked error user"))});}
            };

            chat.getContacts(1, function(err, res) {
                expect(err).to.be.an('object');
                expect(res).to.be.undefined;
                expect(err.message).to.be.equal('Provoked error user');
                done();
            });
        });

    });

    describe("getProjectContacts", function() {
        it("Return user contacts for project when there is the project and 1 user", function(done) {
            Model.project = {
                findOne: function(user) { return { populate: function(name) { return new Promise(function(res, rej){return res(project)}); }}}
            };
            Model.user = {
                find: function(user) { return new Promise(function(res, rej){return res(users)});}
            };

            chat.getProjectContacts(1, 2, function(err, res) {
                expect(err).to.be.null;
                expect(res).to.be.an('object');
                expect(res.groups).to.have.length(1);
                expect(res.users).to.have.length(1);
                done();
            });
        });

        it("Return user contacts for project when there are no users but a project", function(done) {
            Model.project = {
                findOne: function(user) { return { populate: function(name) { return new Promise(function(res, rej){return res(project)}); }}}
            };
            Model.user = {
                find: function(user) { return new Promise(function(res, rej){return res([])});}
            };

            chat.getProjectContacts(1, 2, function(err, res) {
                expect(err).to.be.null;
                expect(res).to.be.an('object');
                expect(res.groups).to.have.length(1);
                expect(res.users).to.have.length(0);
                done();
            });
        });

        it("Return an error when there is no project", function(done) {
            Model.project = {
                findOne: function(user) { return { populate: function(name) { return new Promise(function(res, rej){return rej(new TypeError("Cannot read property 'groups' of undefined"))}); }}}
            };
            Model.user = {
                find: function(user) { return new Promise(function(res, rej){return res([])});}
            };

            chat.getProjectContacts(1, 2, function(err, res) {
                expect(err).to.be.an('object');
                expect(res).to.be.undefined;
                expect(err.message).to.be.equal("Cannot read property 'groups' of undefined");
                done();
            });
        });

        it("Return an error when the user model returns an error", function(done) {
            Model.project = {
                findOne: function(user) { return { populate: function(name) { return new Promise(function(res, rej){return res(project)}); }}}
            };
            Model.user = {
                find: function(user) { return new Promise(function(res, rej){return rej(new Error("Provoked error user"))});}
            };

            chat.getProjectContacts(1, 2, function(err, res) {
                expect(err).to.be.an('object');
                expect(res).to.be.undefined;
                expect(err.message).to.be.equal('Provoked error user');
                done();
            });
        });
    });
});

var project = { 
    groups: [ { 
        name: '1425479481227',
        type: 'private',
        project: '54f7173acd5af30f3a6f518e',
        owner: '54ef99f03f86d2e33e376a75',
        users: [{ id: '54ef99f03f86d2e33e376a75' }],
        id: '54f7173acd5af30f3a6f518b' } ],
    name: '1425479481229',
    type: 'test',
    owner: '54ef99f03f86d2e33e376a75',
    users: [ { id: '54ef99f03f86d2e33e376a75' }],
    id: '54f7173acd5af30f3a6f518e' };

var groups = [{ 
    project: '54f7173acd5af30f3a6f518e',
    owner: '54ef99f03f86d2e33e376a75',
    type: 'private',
    users: [ { id: '54ef99f03f86d2e33e376a75' }],
    id: '54f7173acd5af30f3a6f518b'
}];

var users = [{ 
    email: 'test2@test.com',
    contacts: [ '54ef99f03f86d2e33e376a75' ],
    groups: [ { id: '54f7173acd5af30f3a6f518b' } ],
    projects: [ { id: '54ef99f03f86d2e33e376a79' } ],
    id: '54ef99f03f86d2e33e376a76'
}];