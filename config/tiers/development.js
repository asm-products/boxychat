// Development environment

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
        migrate: 'alter'
    }
};

// Secrets
exports.secrets = {
    token: 'shhhhh'
};

//MAIL configuration
exports.nodemailer = {
		  usessl: true,
		  port: 465,
		  from: 'noreply@boxychat.io',
		  passwordReset_subject: "Please reset password at boxyChat!",
		  password_expiry_ms: 2*60*60*1000,
		  prepend_subject: false,
		  host: 'smtp.mailgun.org',
		  user: 'postmaster@boxychat.io',
		  pass: 'b6727dc949ea75319d1d7ed957346437'
};