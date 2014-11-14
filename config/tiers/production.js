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
        'default': mongoAdapter
    },
    connections: {
        'default': {
            adapter: 'default',
            host: 'localhost',
            database: 'boxychat'
        }
    },
    defaults: {
        migrate: 'alter'
    }
};