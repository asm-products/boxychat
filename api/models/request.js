module.exports = {
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
		}
};