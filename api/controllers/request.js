module.exports = {
		model : 'request',
		actions : {
			/*
			 * an connection invitation from one user to another 
			 * type is enum
			 * 
			 * @param {string}   from            from user id
			 * @param {string}   to            to user id
			 *
			 */
			'post /createInvite' : function(req, res, next){
				var request = {
						from : req.param('from'),
						to : req.param('to'),
						type : 'invite',
				};
				
				Model.request.create(request, function(err, request){
					if(err)
	        			return res.json({status: 'error', data: err});
	        		else{ 	
	        			return res.json({status: 'success', data: request});
	        		}
				});
			},
			
			/*
			 * @param {string}   request            request id
			 * @param {string}   status            status string in {delivered, accepted, refused}
			 */
			'post /updateStatus' : function(req, res, next){
				Model.request.findOne(request).exec(function(err, request){
					request.status = req.param('status');
					request.save(function(err){
						if(err) 
							return res.json({status: 'error', data: err});
						else
							return res.json({status: 'success', data: request});
						});
				});
			},
			
			/*
			 * @param {string}   user            user id
			 * 
			 * request has life cycle: new, delivered, accepted, refused
			 * this will get all requests which have status of new or delivered
			 */
			'post /getForUser' : function(req, res, next){
				Model.request.find({to: req.param('user'), status : ['new', 'delivered']}).exec(function(err, requests){
					if(err) 
						return res.json({status: 'error', data: err});
					else
						return res.json({status: 'success', data: requests});
				});
			},
			
		}
}