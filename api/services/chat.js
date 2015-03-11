module.exports = {
    getProjectContacts: function(projectId, userId, cb) {
        var self = this;
        var response = {};
        this._getProjectGroups(projectId).then(function(project) {
            if(project && project.groups) {
                project.groups.forEach(function (e) {
                    //Group.subscribe(req.socket, e.id); Subscribe to groups
                });
            }
            response.groups = project.groups;

            return self._getProjectUsers(projectId);
        }).then(function(users) {
            return self._manageUsersContacts(users, userId);
        }).then(function(users) {
            response.users = users;
            cb(null, response);
        }).catch(function(error) {
            cb(error);
        });
    },
    getContacts: function(userId, cb) {
        var self = this;
        var response = {};
        this._getContactsGroups(userId).then(function(groups) {
            groups.forEach(function() {
                //Subscribe use to those groups
            });
            response.groups = groups;
            return self._getContactsUsers(userId);
        }).then(function(users) {
            return self._manageUsersContacts(users, userId);
        }).then(function(users) {
            response.users = users;
            cb(null, response);
        }).catch(function(error) {
            cb(error);
        });
    },
    _getContactsGroups: function(userId) {
        return Model.group.find({"users.id": userId, type: 'private'});
    },
    _getContactsUsers: function(userId) {
        return Model.user.find({contacts: userId});
    },
    _getProjectGroups: function(projectId) {
        return Model.project.findOne(projectId).populate('groups');
    },
    _getProjectUsers: function(projectId) {
        return Model.user.find({projects: projectId});
    },
    _manageUsersContacts: function(users, userId) {
        var ids = [];
        var sendUsers = [];
        if (users) {
            users.forEach(function (user) {
                if (user.id !== userId) {
                    //User.subscribe(req.socket, user.id, 'update'); SUBSCRIBE TO USE
                    sendUsers.push({id: user.id, name: user.name, avatar: user.avatar});
                    ids.push({id: user.id});
                }
            });
            return new Promise(function(res, rej) {res(sendUsers);});
            //TODO search for online users;

            // var onlineUsers = [];
            // SessionUser.find({
            //     or: ids
            // }).exec(function (err, sessionUsers) {
            //     sessionUsers.forEach(function (el) {
            //         onlineUsers.push(el.id);
            //     });
            //     res.json({
            //         groups: groups,
            //         users: sendUsers,
            //         online: onlineUsers
            //     });
            // });
        }
    },
};