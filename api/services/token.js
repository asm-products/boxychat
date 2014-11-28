var jwt = require('jsonwebtoken');

module.exports = {

    /**
     * Initialize this service
     * @method initialize
     * @param {Object}    options    options object to initialize with.
     */
    initialize: function (options) {
        options = options || {};
        this.secret = options.secret;
    },

    /**
     * Verifies and decodes a token
     * @method verify
     * @param {string}   token              the token to be verified
     * @param {Function} cb[err, decoded]   the callback to call returning decoded data if verified
     * @return
     */
    verify: function (token, cb) {
        jwt.verify(token, this.secret, function(err, decoded) {
            if (err) { return cb(err); }
            if (!decoded) { return cb(null, false); }
            return cb(null, decoded);
        });
    },

    /**
     * Create a token with a signed payload and options
     * @param {Object}  payload    the payload object to sign
     * @param {Object}  options    token generation options
     * @returns {string} the token
     */
    sign: function (payload, options) {
        return jwt.sign(payload, this.secret, options);
    }
};