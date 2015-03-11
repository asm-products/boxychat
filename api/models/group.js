module.exports = {
	tableName: 'groups',
	identity: 'group',
	
	attributes: {
		name: {
			type: 'string', 
			unique: true
		},
		type: {
			type: 'string',
			index: true
		},
		project: {
			model: 'project'
		},
		users: {
			type: 'array',
			index: true
		},
		owner: {
			model:'user'
		}
	}
};
