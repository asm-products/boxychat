var slug = require('slug');
module.exports = {
		identity: 'project',

		attributes: {
			name: 'String',
			slug: {
				type: 'String',
				index: true,
				unique: true
			},
			type: 'String',
			conversation: 'String',
			owner: 'String',
			people: {
				type: 'Array',
				index: true
			},
			groups: {
				collection: 'Group',
				via: 'project'
			}
		},
		beforeCreate: function (project, cb) {
			project.slug = slug(project.name);
			return cb(null, project);
		}
};