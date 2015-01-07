module.exports = {
		'post /project/create': function (req, res, next) {
			var params = req.params.all();
			Project.create({name: params.company}, function (err, company) {
			});
		},
		'post /project/remove: function (req, res, next) {
		},
		'post /project/update: function (req, res, next) {
		},
		'get /ownProjects': function(req, res, next) {
			Model.project.find({people: req.session.user.id}).exec(function (err, projects) {
				var returnProjects = [];
				if(projects) {
					projects.forEach(function(el) {
						Model.project.subscribe(req.socket, el.id, ['update']);
						returnProjects.push({id: el.id, name: el.name, slug: el.slug});
					});
				}
				res.json(returnProjects);
			});
		},
		/**
		 * Description
		 * @method join
		 * @param {} req
		 * @param {} res
		 * @param {} next
		 * @return
		 */
		'post /project/join': function (req, res, next) {
			var roomId = req.params.roomId;
			Model.group.findOne(roomId).exec(function findOneCB(err, found) {
				if (found) {
					found.users.forEach(function (element) {
						if (element == req.session.user.id) {
							return Model.group.subscribe(req, roomId, ['message']);
						}
					});
				}
			});
		}
};