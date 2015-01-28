module.exports = {
		model : 'project',
		actions : {
			/**
		     * create project by owner
		     * 
		     * @param {string}   name            project name
		     * @param {string}   type            project type
		     * @param {string}   owner           project owner id
		     */
	        'post /project/create': function (req, res, next) {
	        	var project = {
	        	name: req.param('name'),
	        	type: req.param('type'),
	        	owner: req.param('owner'),
	        	users: [{id: req.param('owner')}]
	        	};
	        	
	        	Model.project.create(project, function(err, project){
	        		if(err)
	        			return res.json({status: 'error', data: err});
	        		else{ 	
	        			//update user.projects as well
    					//need to move this to service class
	        			Model.user.findOne(req.param('owner'), function(err, user){
	        				if(err)
        						console.log("can't find user with id: " + req.param('owner'));
	        				else{	        				
	        					user.projects.push({id: project.id});
	        					user.save(function(err, re){
	        						if(err)
	        							console.log("update user.project fails: " + user.id + " - " + project.id);
	        					});
	        				}
	        			});
	        			return res.json({status: 'success', data: project});
	        		}
	        	});	
	        },
	        
	        /**
		     * add user to project
		     * 
		     * @param {string}   project        project id
		     * @param {string}   user           user id
		     */
	        'post /project/addUser': function (req, res, next) {
	        	Model.project.findOne(req.param('project'), function(err, project){
	        		if(err)
	        			return res.json({status: 'error', data: err});
	        		else{	        			
	        			project.users.push({id:req.param('user')});	        			
	        			project.save(function(err, re){
	        				if(err)
	                			return res.json({status: 'error', data: err});
	                		else{	     			
	                			//need to update user.projects as well
	        					//and move this to service class
	                			return res.json({status: 'success', data: re});
	                		}
	        			});
	        		}
	        	});
	        },
	        
	        /**
		     * add user to project
		     * 
		     * @param {string}   project        project id
		     * @param {string}   user           user id
		     */
	        'post /project/removeUser': function (req, res, next) {
	        	Model.project.findOne(req.param('project'), function(err, project){
	        		if(err)
	        			return res.json({status: 'error', data: err});
	        		else{	        			
	        			var left = project.users.filter(function(el){return el.id!= req.param('user');});	        			
	        			Model.project.update(project.id, {users : left}).exec(function(err, re){
	        				if(err)
	                			return res.json({status: 'error', data: err});
	                		else{	     			
	                			//need to update user.projects as well
	        					//and move this to service class
	                			Model.user.findOne(user, function(err, usr){   
	                				var left = usr.projects.filter(function(el){return el.id!=req.param('project');})
	                				Model.user.update(usr.id, {projects: left}).exec(function(err, re){
	                					console.log(err + re);
	                				});
	                			});
	                			return res.json({status: 'success', data: re});
	                		}
	        			});
	        		}
	        	});
	        },
	        
	        /**
		     * get projects by owner
		     * 
		     * @param {string}   owner           project owner id
		     */
	        'get /project/ownedBy': function(req, res, next) {
				Model.project.findByOwner(req.param("owner"), function (err, projects) {
					var returnProjects = [];
					if(projects) {
						projects.forEach(function(el) {
							//Model.project.subscribe(req.socket, el.id, ['update']);
							returnProjects.push({id: el.id, name: el.name, slug: el.slug});
						});
					}
					res.json(returnProjects);
				});
			},
			
		}
};