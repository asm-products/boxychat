module.exports = {
		identity: 'request',
		
		attributes: {
			type: {
				type: 'string',
				index: true
			},
			from: {
				model:'User'
			},
			to: {
				model: 'User'
			},
			email: {
				type: 'string',
				index: true
			},
			status: 'string'
		},
		beforeCreate: function (request, cb) {
			request.status = 'new';
			return cb(null, request);
		}
};