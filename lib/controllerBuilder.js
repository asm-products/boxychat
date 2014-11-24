var _ = require('lodash');
var baseController = require('./controller');

module.exports = function (app, controllerDefinition) {

    var router = require('express').Router();
    var routerPath = controllerDefinition.path || '/' + controllerDefinition.identity;

    var controllerModel = controllerDefinition.model ? app.models[controllerDefinition.model] : null;
    var controllerSockets = controllerDefinition.sockets;
    var controllerActions = controllerDefinition.actions;

    var context = _.extend(controllerDefinition, {
        router: router,
        path: routerPath,
        model: controllerModel,
        models: app.models,
        services: app.services,
        sockets: app.sockets
    });

    this.buildActions = function () {

        var actionBinder = function (actionHandler, actionKey) {
            var actionSplit = actionKey.split(' '),
                httpVerb = actionSplit[0],
                routePath = actionSplit[1];

            var boundActionHandlers;
            if (_.isArray(actionHandler)) {
                boundActionHandlers = _.map(actionHandler, function (handlerFn) {
                    return _.bind(handlerFn, context);
                });
            } else {
                boundActionHandlers = [_.bind(actionHandler, context)];
            }
            router[httpVerb].apply(router, [routePath].concat(boundActionHandlers));
        };

        if (controllerActions) {
            _(controllerActions).each(actionBinder);
        }

        if (controllerModel) {
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

        if (controllerSockets) {

            var contextWithSocket = _.extend(context, {socket: socket});
            var socketsIncludingBaseSockets = _.extend(baseController.sockets, controllerSockets);

            _(socketsIncludingBaseSockets).each(function (value, key) {
                socket.on(controllerDefinition.identity + ':' + key, _.bind(value, contextWithSocket));
            });
        }
    };
};