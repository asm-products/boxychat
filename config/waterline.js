var env = process.env.NODE_ENV || 'development';

var mongoAdapter = require('sails-mongo');

var config = {
    development: {
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
    },

    test: {
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
    },

    production: {
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
    },
};

module.exports = config[env];
