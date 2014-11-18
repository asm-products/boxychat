var _ = require('lodash');
var baseController = require('./controller');

module.exports = function (app, controllerDefinition) {

    var router = require('express').Router();
    var routerPath = '/' + controllerDefinition.identity;
    var model = controllerDefinition.model ? app.models[controllerDefinition.model] : null;

    var context = _.extend(controllerDefinition, {
        router: router,
        path: routerPath,
        model: model,
        models: app.models,
        services: app.services,
        sockets: app.sockets
    });

    this.buildActions = function () {

        var actionBinder = function (actionHandler, actionKey) {
            var actionSplit = actionKey.split(' '),
                httpVerb = actionSplit[0],
                routePath = actionSplit[1];

            router[httpVerb](routePath, _.bind(actionHandler, context));
        };

        if (controllerDefinition.actions) {
            _(controllerDefinition.actions).each(actionBinder);
        }

        if (model) {
            _(baseController.actions).each(actionBinder);
        }

        if (controllerDefinition.mount) {
            // If the controller has its own mounting method, call it
            controllerDefinition.mount.call(context, app);
        } else {
            // Mount the controller to express
            app.use(routerPath, router);
        }

    };

    this.buildSockets = function (socket) {

        if (controllerDefinition.sockets) {

            var contextWithSocket = _.extend(context, {socket: socket});
            var socketsIncludingBaseSockets = _.extend(baseController.sockets, controllerDefinition.sockets);

            _(socketsIncludingBaseSockets).each(function (value, key) {
                socket.on(key, _.bind(value, contextWithSocket));
            });
        }
    };
};