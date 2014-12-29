// A model that all others can inherit from

var _ = require('lodash');

var BaseModel = function (model) {
    return _.extend({
        // Pre-define the default connection
        connection: 'default'

    }, model);
};

module.exports = BaseModel;