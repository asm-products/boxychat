module.exports = {
    model: 'group', // If no model is specified, CRUD actions won't be inherited
    actions: {
    	/**
	     * create group by owner
	     * 
	     * @param {string}   name            group name
	     * @param {string}   type            group type
	     * @param {string}   project         project the group belongs to	optional
	     * @param {string}   owner           group owner id
	     */
        'post /group/create': function (req, res, next) {
        	var group = {
        	name: req.param('name'),
        	type: req.param('type'),
        	project: req.param('project'),
        	owner: req.param('owner'),
        	users: [{id: req.param('owner')}]
        	};
        	
        	Model.group.create(group, function(err, group){
        		if(err)
        			return res.json({status: 'error', data: err});
        		else	     			
        			return res.json({status: 'success', data: group});
        	});
        		
        },
        
        /**
	     * add user to a group
	     * 
	     * @param {string}   name            group name
	     * @param {string}   user            user id
	     */
        
        'post /group/addUser': function (req, res, next) {
        	var name = req.param('name');
        	var user = req.param('user');
        	Model.group.findOneByName(name, function (err, group) {
        		if(err)
        			return res.json({status: 'error', data: err});
        		else{	     			
        			group.users.push({id:user});
        			Model.group.update(group.id, {users : group.users}).exec(function(err, re){
        				if(err)
                			return res.json({status: 'error', data: err});
                		else	     			
                			return res.json({status: 'success', data: re});
        			});
        			}
        		}       		
        	}       	       	
        },       
    }