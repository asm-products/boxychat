var LocalStrategy   = require('passport-local').Strategy;

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

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        }, function(req, email, password, done) {
            req.app.models.user.findOne({ 'email' :  email }, function(err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done({err: 'Oops! Wrong user.'}, false);

                user.validPassword(password, function(err, result) {
                    if(err || result === false) return done({err: 'Oops! Wrong password.'}, false);
                    return done(null, user);
                });
            });

        }));
};