var _ = require('lodash'),
    express = require('express'),
    requireAll = require('require-all'),
    config = require('./config/config'),
    path = require('path'),
    waterline = require('waterline');

// Instantiate a new instance of the ORM
var orm = new waterline();

var rootPath = path.normalize(__dirname + '/api');

var app = express();

// Require all models, controllers
var models = requireAll(rootPath + '/models'),
    controllers = requireAll(rootPath + '/controllers'),
    routes = requireAll(rootPath + '/routes');

// Load models into waterline
_(models).each(function (model) {
    orm.loadCollection(waterline.Collection.extend(model));
});

orm.initialize(config.orm, function (err, models) {
    if (err) throw err;

    app.models = models.collections;
    app.databases = models.connections;

    // Load controllers, routes, config into app instance
    app.controllers = {};
    _(controllers).each(function (controller, key) {
        app.controllers[key] = controller(app);
    });
    app.routes = {};
    _(routes).each(function (route, key) {
        app.routes[key] = route(app);
    });
    app.config = config.app;

    require('./config/express')(app, app.config);

    app.listen(config.app.port, function () {
        console.log(config.app.name + ' server listening on port ' + config.app.port);
    });

});