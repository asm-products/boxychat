var jwt = require('jsonwebtoken');

module.exports = {

    /**
     * Verifies and decodes a token
     * @method verify
     * @param {string}   token              the token to be verified
     * @param {string}   secret             the secret to use
     * @param {Function} cb[err, decoded]   the callback to call returning decoded data if verified
     * @return
     */
    verify: function (token, secret, cb) {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) { return cb(err); }
            if (!decoded) { return cb(null, false); }
            return cb(null, decoded);
        });
    }
};