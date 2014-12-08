
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
			Model.user.findOne({'email': email}, function (err, user) {
		        if (err)
		            cb(err);
		        else
		        	cb(null, user);
			});
		}
		
			
};