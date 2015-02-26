var nodemailer = require('nodemailer');
var config = require('../../config/config.js');

module.exports = {

    /**
     * Sends an email to a given recipient
     * @method send
     * @param {object}   email           an object containing all of the necessary data to email
     * @param {Function} cb[err, res]    the callback to call once email is sent, or if it fails
     * @return
     */
    send: function (email, cb) {

        /** sets up the modemailer smtp transport */
        var transport = nodemailer.createTransport(config.nodemailer.type, {
            service: config.nodemailer.service,
            auth: {
                user: config.nodemailer.user,
                pass: config.nodemailer.pass
            }
        });

        /** sets up the mail options, from and such like that **/
        var from = email.from || 'nobody@nobody.com';
        var subject;
        if (config.nodemailer.prependSubject) {
            subject = config.nodemailer.prependSubject + email.subject;
        } else {
            subject = email.subject;
        }

        var mailOptions = {
            from: email.name + '<' + from + '>',
            to: email.to,
            subject: subject,
            html: email.messageHtml
        };

        /** Actually sends the email */
        transport.sendMail(mailOptions, function (err, response) {
            if (err) return cb(err);
            return cb(null, response);
        });
    }
};