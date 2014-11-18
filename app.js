var _ = require('lodash'),
    express = require('express'),
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
    routes = requireAll(rootPath + '/routes');

// Load models into waterline
_(models).each(function (model) {
    orm.loadCollection(waterline.Collection.extend(new baseModel(model)));
});

orm.initialize(config.orm, function (err, models) {
    if (err) throw err;

    app.models = models.collections;
    app.databases = models.connections;

    app.config = config.app;

    require('./config/express')(app, app.config, function () {

        // Load routes
        app.routes = {};
        _(routes).each(function (route, key) {
            app.routes[key] = route(app);
        });

        // Load listen socket
        app.sockets = require('./config/socket-io')(server, app);

        // Load controllers
        app.controllers = {};

        var controllerBuilder = require('./lib/controllerBuilder');
        var controllerBuilders = {};

        _(controllers).each(function (controller, key) {
            controller.identity = key;

            var builder = new controllerBuilder(app, controller);
            controllerBuilders[key] = builder;
            app.controllers[key] = controller;
            builder.buildActions();
        });

        // Bind controller sockets on incoming connections
        app.sockets.on('connection', function (socket) {
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