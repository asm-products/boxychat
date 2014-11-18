// This controller will inherit CRUD actions from its base controller implementation
// Go ahead and try to POST a new user to /user

module.exports = {
    model: 'user', // If no model is specified, CRUD actions won't be inherited
    actions: {
        // Custom actions can be added
        // The action keys must be in this format:
        // 'verb /route'
        'get /hello': function (req, res, next) {
            res.send('Hello world!');
        },
        // Override the inherited read action
        'get /:id': function(req, res, next){
            var err = new Error('Not authorized!');
            err.status = 401;
            next(err);
        }
    }
};