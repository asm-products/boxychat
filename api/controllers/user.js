var Controller = require('../controller');

module.exports = function (app) {

    // Grab our model instance from the app object
    var UserModel = app.models.user;

    // This controller will inherit CRUD actions from its base controller implementation
    // Go ahead and try to POST a new user to /user
    var UserController = new Controller(UserModel, function (router) {

        // Custom actions can be added
        router.get('/hello', function (req, res, next) {
            res.send('Hello world!');
        });

        // Override the inherited read action
        router.get('/:id', function (req, res, next) {
            var err = new Error('Not authorized!');
            err.status = 401;
            next(err);
        });
    });

    // Here we can mount our controller using its generated route path
    // And we are free to add more middleware if needed
    app.use(UserController.path, UserController);
};
