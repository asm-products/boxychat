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
			owner: 'String',
			users: {
				type: 'Array',
				index: true
			},

		},
		beforeCreate: function (project, cb) {
			project.slug = slug(project.name);
			return cb(null, project);
		}
};