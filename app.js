var _ = require('lodash'),
    express = require('express'),
    passport = require('passport'),
    requireAll = require('require-all'),
    config = require('./config/config'),
    path = require('path'),
    waterline = require('waterline'),
    baseModel = require('./lib/model');

// Instantiate a new instance of the ORM
var orm = new waterline();

var rootPath = path.normalize(__dirname + '/api');

var app = express();
var server = require('http').createServer(app);

// Require all models, controllers
var models = requireAll(rootPath + '/models'),
    controllers = requireAll(rootPath + '/controllers'),
    routes = requireAll(rootPath + '/routes'),
    services = requireAll(rootPath + '/services');

// Load models into waterline
_(models).each(function (model) {
    orm.loadCollection(waterline.Collection.extend(new baseModel(model)));
});

orm.initialize(config.orm, function (err, models) {
    if (err) throw err;

    app.models = models.collections;
    app.databases = models.connections;

    app.config = config.app;

    // Configure passport
    require('./config/passport')(passport);

    // Configure express
    require('./config/express')(app, app.config, passport, function () {

        // Load routes
        app.routes = {};
        _(routes).each(function (route, key) {
            app.routes[key] = route(app);
        });

        // Load services
        app.services = {};
        global.Service = {};
        _(services).each(function (service, key) {
            app.services[key] = service;
            global.Service[key] = service;
        });

        //expose waterline orm
        global.Model = app.models;
        
        // Initialize services that need to be so
        Service.token.initialize({secret: config.secrets.token});

        // Configure and load listen socket
        app.sockets = require('./config/socket-io')(server);

        // Load controllers
        app.controllers = {};

        var ControllerBuilder = require('./lib/controllerBuilder');
        var controllerBuilders = {};

        _(controllers).each(function (controller, key) {
            controller.identity = key;

            var builder = new ControllerBuilder(app, controller);
            controllerBuilders[key] = builder;
            app.controllers[key] = controller;
            builder.buildActions();
        });

        // Bind controller sockets on incoming connections
        app.sockets.on('connection', function (socket) {
            // add a user to a room with it's same ID
            socket.join(socket.user.id);
            // Bind each controller's socket handlers for this connection
            _(controllerBuilders).each(function (builder) {
                builder.buildSockets(socket);
            });
        });

    });

    server.listen(config.app.port, function () {
        console.log(config.app.name + ' server listening on port ' + config.app.port);
    });

});