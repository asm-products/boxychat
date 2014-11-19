
// Routes outside of the regular convention can be defined here.
module.exports = function (app) {

    // Index
    app.get('/', function (req, res, next) {
        res.send('Welcome to ' + req.app.config.name + '!');
    });

};