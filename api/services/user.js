
module.exports = {
		 //model: 'user',	
		 /**
	     * Find a user by email address
	     * @method findByEmail
	     * @param {string}   email              the email to be verified
	     * @param {Function} cb[err, user]   the callback to call returning user data if found
	     * @return
	     */
		findByEmail: function (email, cb) {
			Model.user.findByEmail(email, function (err, user) {
		        if (err || !user || user.length === 0)
		            cb(err || new Error('Email_Not_Found'));
		        else
		        	cb(null, user);
			});
		}
		
			
};