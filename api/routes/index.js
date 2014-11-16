// Routes outside of the regular convention can be defined here.
module.exports = function (app) {

    // Index
    app.get('/', function (req, res, next) {
        res.send('Welcome to ' + req.app.config.name + '!');
    });

    app.post('/login', function (req, res, next) {
        app.passport.authenticate('local-login',
            function (err, user, info) {
                if (err) return res.json(500, err);
                req.logIn(user, function (err) {
                    if (err) res.json(err);
                    return res.json({success:true}); //res.send({ message: 'login successful' });
                });
            })(req, res);

    });
};