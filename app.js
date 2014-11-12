var express = require('express')
  , load = require('express-load')
  , Waterline = require('waterline')
  , app = express();

var orm = new Waterline();
var diskAdapter = require('sails-disk');
 
 
// Build A Config Object
var config = {
    adapters: {
        'default': diskAdapter,
        disk: diskAdapter
    },
    connections: {
        myLocalDisk: {
            adapter: 'disk'
        }
    }
};

/**
 *  Autoload Configuration.
 */
load('config').into(app);

for (var environment in app.config) {
    if (environment == app.get('env')) {
        for (var key in app.config[environment].app) {
            app.set(key, app.config[environment].app[key]);
        }
    }
}

/**
 *  Autoload models, controllers and routes into application instance.
 */
load('models')
    .then('controllers')
    .then('routes')
    .into(app);

/** 
 * load models into waterline
 */
for(var key in app.models) {
    orm.loadCollection(Waterline.Collection.extend(app.models[key]));
}

orm.initialize(config, function(err, models) {
  if(err) throw err;
 
  app.models = models.collections;
  app.connections = models.connections;

  app.listen(app.get('port'));
});

console.log('%s running in %s mode on port %s' 
  , app.get('title')
  , app.get('env')
  , app.get('port')
);
