module.exports = {
    model: 'group', // If no model is specified, CRUD actions won't be inherited
    actions: {
        // Custom actions can be added
        // The action keys must be in this format:
        // 'verb /route'
        'post /group/create': function (req, res, next) {
        	var params = req.params.all();
        	var name = params.name;
        	var group = {
        	name: name,
        	type: 'private',
        	owner: req.session.user.id,
        	users: [{id: req.session.user.id, name: req.session.user.name}]
        	};
        	Model.group.create(group).exec(function(err, group) {
        	res.json(group);
        	});
        },
        
        'post /group/join': function (req, res, next) {
        	var roomId = req.params.roomId;
        	Group.findOne(roomId).exec(function findOneCB(err, found) {
        	if (found) {
        	found.users.forEach(function (element) {
        	if (element == req.session.user.id) {
        	return Model.group.subscribe(req, roomId, ['message']);
        	}
        	});
        	}
        	});
        },
        
        
        
    }