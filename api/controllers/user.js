var Controller = require('../controller');

module.exports = function (app) {

    // Grab our model instance from the app object
    var UserModel = app.models.user;

    // This model will inherit CRUD actions from its base controller implementation
    // Go ahead and POST a new user to /user
    var UserController = new Controller(UserModel, function (router) {

        router.get('/hello', function (req, res, next) {
            // Custom actions
            res.send('Hello world!');
        });

        router.get('/:id', function (req, res, next) {
            // Override a blueprint action
            var err = new Error('Not authorized!');
            err.status = 401;
            next(err);
        });
    });

    // Here we can register our controller under its auto-generated path as its route
    // And we are free to add more middleware if needed
    app.use(UserController.path, UserController);
};