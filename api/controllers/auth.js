var jwt = require('jsonwebtoken');
var passport = require('passport');
// This controller will inherit CRUD actions from its base controller implementation
// Go ahead and try to POST a new user to /user

function loginEmailPassword(req, email, password, cb) {
    req.app.models.user.findOne({'email': email}, function (err, user) {
        if (err || !user)
            return cb(err);

        user.validPassword(password, function (err, result) {
            if (err || result === false) return cb({err: 'Oops! Wrong password.'});
            return cb(null,user);
        });
    });
}

function loginToken(req,token, cb) {
    req.app.models.user.findOne({ 'email' :  email }, function(err, user) {
        if (err || !user)
            return cb(err);
        return cb(null, user);
    });
}

function login(req,cb) {
    var email = req.param('email');
    var password = req.param('password');
    var token = req.param('token');
    if(email && password) {
        loginEmailPassword(req, email, password, cb);
    } else if(token) {
        loginEmailPassword(req, token, cb);
    }
}

module.exports = {
    routes: function (router) {
        //login route
        router.post('/login', function (req, res, next) {
            login(req, function(err, user) {
                if(err || !user) {
                    return res.json(500, {message: 'Check your email'});
                }
                var accessToken = jwt.sign({ id: "3" }, 'shhhhh');
                return res.json({access_token: accessToken});
            });
        });

        router.get('/test', passport.authenticate('bearer', { session: false }), function (req, res, next) {
            res.json({test: "test"});
        });

    },
    mount: function (app) {
        // Here we can mount our controller using its generated route path
        // And we are free to add more middleware if needed
        app.use('/', this);
    }
};