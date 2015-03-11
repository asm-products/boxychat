module.exports = {

    identity: 'user',

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        activated: 'boolean',
        activationToken: 'string',
        token: 'string',
        contacts: {
            type: 'array',
            defaultsTo: []
        },
        groups: {
            type: 'array',
            defaultsTo: []
        },
        projects: {
            type: 'array',
            defaultsTo: []
        },

        validPassword: function(password, cb) {
            Service.crypt.compare(password, this.password, function (error, response) {
                if (error) return cb(error, response);
                return cb(null, response);
            });
        },

        // Override to filter out sensitive information such as passwords.
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.activationToken;
            delete obj.token;
            return obj;
        }
    },

    /**
     * Hash the users password with bcrypt
     * @method beforeCreate
     * @param {object}   user            the object of the submitted user data
     * @param {Function} cb[err, user]   the callback to be used when bcrypts done
     * @return
     */
    beforeCreate: function (user, cb) {
        try{Service.crypt.generate({saltComplexity: 10}, user.password, function (err, hash) {
            if (err) {
                return cb(err);
            } else {
                user.password = hash;
                user.activated = false;
                user.activationToken = Service.crypt.token(new Date().getTime() + user.email);
                user.token = Service.crypt.token(new Date().getTime() + user.email + new Date().getTime());

                return cb(null, user);
            }
        });
        }catch(err){return cb(null, user);}
    }

};