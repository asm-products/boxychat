module.exports = {
    model: 'group', // If no model is specified, CRUD actions won't be inherited
    actions: {
    	/**
	     * create group by owner
	     * 
	     * @param {string}   name            group name
	     * @param {string}   type            group type
	     * @param {string}   project         id of the project the group belongs to	optional
	     * @param {string}   owner           group owner id
	     */
        'post /create': function (req, res, next) {
        	var userId = req.param('owner');
        	var group = {
        	name: req.param('name'),
        	type: req.param('type'),
        	project: req.param('project'),
        	owner: req.param('owner'),
        	users: [{id: userId}]
        	};
        	
        	Model.group.create(group, function(err, group){
        		if(err)
        			return res.json({status: 'error', data: err});
        		else{
        			//code update user.groups with newly created group
        			//should move to service class
        			Model.user.findOne(userId, function(err, user){
        				if(err | !user )
    						console.log("can't find user with id: " + userId);
        				else{
        					if(!user.groups)
        						user.groups = [];
        					user.groups.push({id: group.id});
        					user.save(function(err, re){
        						if(err)
        							console.log("update user.groups fails: " + user.id + " - " + group.id);
        					});
        				}
        			});
        			return res.json({status: 'success', data: group});
        		}
        	});
        		
        },
        
        /**
	     * add user to a group
	     * 
	     * @param {string}   group            group id
	     * @param {string}   user            user id
	     */
        
        'post /addUser': function (req, res, next) {
        	var grp = req.param('group');
        	var user = req.param('user');
        	Model.group.findOne(grp, function (err, group) {
        		if(err)
        			return res.json({status: 'error', data: err});
        		else{	     			
        			group.users.push({id:user});
        			group.save(function(err, re){
        				if(err)
                			return res.json({status: 'error', data: err});
                		else
                			//code update user.groups
                			//similar to create method above
                			return res.json({status: 'success', data: re});               		
        			});
        		}
        	});       		       	       	
        },
        
        /**
	     * remove user from a group
	     * can owner be removed?
	     * 
	     * @param {string}   group            group id
	     * @param {string}   user            user id
	     */       
        'post /removeUser': function (req, res, next) {
        	var grp = req.param('group');
        	var user = req.param('user');
        	Model.group.findOne(grp, function (err, group) {
        		if(err)
        			return res.json({status: 'error', data: err});
        		else{	     			
        			var left = group.users.filter(function(el){ return el.id!=user;})
        			group.update({users : left}).exec(function(err, re){
        				if(err)
                			return res.json({status: 'error', data: err});
                		else{
                			//code update user.groups
                			Model.user.findOne(user, function(err, usr){
                				var left = usr.groups.filter(function(el){return el.id!=grp;})
                				Model.user.update(usr.id, {groups : left}).exec(function(err, re){ 
                					if(err)
                					  console.log("failed to update user.groups");	
                				});
                			});
                			
                			return res.json({status: 'success', data: re});
                		}
        			});
        		}
        	});       		       	       	
        },
        
       
    }
   }