var express = require('express'),
    config = require('./config/config'),
    glob = require('glob'),
    waterlineConfig = require('./config/waterline'),
    waterline = require('waterline');

// Instantiate a new instance of the ORM
var orm = new waterline();

// Require all models
var models = glob.sync(config.root + '/api/models/*.js');
models.forEach(function (model) {
    model = require(model);
    // Load the model into the ORM
    orm.loadCollection(model);
});
var app = express();

orm.initialize(waterlineConfig, function(err, models){
    if(err) throw err;

    app.models = models.collections;
    app.databases = models.connections;

    require('./config/express')(app, config);

    app.listen(config.port);
});


