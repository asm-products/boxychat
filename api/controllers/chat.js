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
        chatMessage: function (message) {
            var that = this;
            this.models.user.findOne(this.socket.user)
                .then(function (user) {
                    var out = '[' + user.firstName + '] ' + message;
                    console.log(out);
                    that.sockets.emit('chat:message', out);
                });
        },
        privateMessage: function (toUser, message) {
            var that = this;
            this.models.user.findOne(toUser).then(function (user) {
                var out = 'Private[' + user.firstName + '] ' + message;
                that.socket.broadcast.to(toUser).emit('chat:message', out);
            });
        }
    }
};