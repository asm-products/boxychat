var Model = require('../model');

var User = new Model({

    identity: 'user',

    attributes: {
        first_name: 'string',
        last_name: 'string'
    }
});

module.exports = User;