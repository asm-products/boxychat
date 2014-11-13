// A model that all others can inherit from

var _ = require('lodash');
var Waterline = require('waterline');

var BaseModel = function (model) {
    return Waterline.Collection.extend(_.extend({

        // Pre-define the default connection
        connection: 'default'

    }, model));
};

module.exports = BaseModel;