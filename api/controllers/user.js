// This controller will inherit CRUD actions from its base controller implementation
// Go ahead and try to POST a new user to /user

// callback of callback :(
function sendEmail(req, cb){
	var email = req.param('email');
    var config = req.app.config;
	Service.user.findByEmail(email, function(err, user){
		if(err)
		   cb(err, {errId: 'Email_Address_Not_Exist', err: err});
		else{
			var accessToken = Service.token.sign({email: email, expiryAt: new Date().getTime() + config.nodemailer.passwordExpiryMs });
			var link = config.nodemailer.passwordResetLink + "?token=" + accessToken;
			var msg = '<html>Hello there, </br>Greetings from boxychat, this is your password reset link, click <a href="' + link + '">here</a></html>';
			console.log("send password reset email out to " + email);
			var emailObj = {
					'name' : config.nodemailer.name,
					'from' : config.nodemailer.from,
    				'to' :		email,
    				'subject' : config.nodemailer.passwordResetSubject,
    				'messageHtml' : msg
    		};
    		
    		Service.mail.send(emailObj, function(err, response){
    			if(err)
    				cb(err, {errId: 'Send_Email_Failure', err: err});
    			else{
                    /*jshint camelcase: false */
    				cb(null, {access_token: accessToken});
    			}
    		});
			
		}	
	});	
}

module.exports = {
    model: 'user', // If no model is specified, CRUD actions won't be inherited
    actions: {
        /**
	     * user provides email address and system send the password link 
	     * 
	     * @param {string}   email            user's email address
	     */
        'post /forgotpassword': function(req, res, next){
        	var cb = function(err, msg){
        		if(err)
        			return res.json({status: 'error', data: msg});
        		else	     			
        			return res.json({status: 'success', data: msg});
        	};
        	
        	sendEmail(req, cb);
        },
        
        /**
	     * 
	     * @param {string}   email            user's email address
	     * @param {string}   password            user's new password
	     * @param {string}   confirm            user's new password
	     * this API is protected by the access token generated by /forgotpassword API
	     * assume the token is verified already
	     */
        'post /passwordReset' : function(req, res, next){
        	var email = req.param('email');
        	var pass = req.param('password');
        	//var confirm = req.param('confirm');
        	
        	Service.crypt.generate({saltComplexity: 10}, pass, function (err, hash) {
        		console.log("password for " + email + " is reset");
        		Model.user.update({email: email}, {password: hash}, function(err, model){
        			if(err) return res.json(500, { err: err });
        			else if(!model || model.length === 0) 
        				return res.json(400, { err: 'email address not found' });
        			else	
        				res.json({status: 'success', data: model});
        		});
        	});
        },
        'get /contacts': function(req, res, next) {
            Service.chat.getContacts('54ef99f03f86d2e33e376a75', function(err, val) {
                res.json(val);
            });
        },
        'get /contacts/:id': function(req,res,next) {
            Service.chat.getProjectContacts(req.params.id, '54ef99f03f86d2e33e376a75', function(err, val) {
                res.json(val);
            });
        },
        // Override the inherited read action
        'get /:id': function(req, res, next){
            var err = new Error('Not authorized!');
            err.status = 401;
            next(err);
        }

              
    }
};