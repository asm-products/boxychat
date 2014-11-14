// Configuration loader

var env = process.env.NODE_ENV || 'development';

var path = require('path'),
    glob = require('glob');

var loadedConfig = {};

var configFiles = glob.sync(__dirname + '/tiers/*.js');

configFiles.forEach(function (config) {

    var key = path.basename(config, '.js');

    if (key === env) {
        loadedConfig = require(config);
        loadedConfig.env = env;
    }

});

if (Object.keys(loadedConfig).length === 0) {
    console.error('Unable to load config file. Make sure an environment tier exists for:', env);
}

module.exports = loadedConfig;
