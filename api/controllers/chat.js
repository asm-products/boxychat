module.exports = {
    model: 'chat',
    sockets: {
        connect: function() {
            //TODO: not working for the moment
            console.log('user connected');

        },
        disconnect :function() {
            //TODO: not working for the moment
            console.log('user disconnected');
        },
        chatMessaged: function (message) {
            var that = this;
            this.models.user.findOne(this.socket.user)
                .then(function (user) {
                    var out = '[' + user.firstName + '] ' + message;
                    console.log(out);
                    that.sockets.emit('chat:message', out);
                });
        },
        chatMessage: function (toUser, message) {
            
            var that = this;
            
            Model.user.findOne(toUser).then(function (user) {
                that.sockets.in(toUser).emit('chat:message', {user: that.socket.user.id, message: message});
            });
        }
    }
};