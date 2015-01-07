module.exports = {
		attributes: {
			type: {
				type: 'string',
				index: true
			},
			owner: {
				model:'User'
			},
			text: 'string',
			reference: 'string',
			name: 'string',
			status: 'string'
		},

};