var BearerStrategy   = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        req.app.models.User.findOne(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new BearerStrategy(
        function(token, done) {
            jwt.verify(token, 'shhhhh', function(err, decoded) {
                if (err) { return done(err); }
                if (!decoded) { return done(null, false); }
                return done(null, decoded.id, { scope: 'all' });
            });
        }
    ));
};