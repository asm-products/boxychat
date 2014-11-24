var jwt = require('jsonwebtoken');
var passport = require('passport');


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
    path: '/', // mount on index (root) path
    actions:  {
        //login route
        'post /login': function (req, res, next) {
            login(req, function(err, user) {
                if(err || !user) {
                    return res.json(500, {message: 'Check your email'});
                }
                var accessToken = jwt.sign({ id: "3" }, 'shhhhh');
                return res.json({access_token: accessToken});
            });
        },

        'get /test': [
            passport.authenticate('bearer', {session: false}),
            function (req, res, next) {
                res.json({test: "test"});
            }
        ]

    }
};