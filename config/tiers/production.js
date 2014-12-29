// Production environment

// Application configuration
var rootPath = require('path').normalize(__dirname + '/../..');

exports.app = {
    root: rootPath,
    name: 'Boxychat',
    port: 3000
};

// Waterline ORM configuration
var mongoAdapter = require('sails-mongo');

exports.orm = {
    adapters: {
        'mongo': mongoAdapter
    },
    connections: {
        'default': {
            adapter: 'mongo',
            host: 'localhost',
            database: 'boxychat'
        }
    },
    defaults: {
        migrate: 'safe'
    }
};

// Secrets
exports.secrets = {
    token: 'CHANGE ME TO SOMETHING SECURE'
};