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
            //TODO: needs a nice way of sending to a specific socket based on a user id, not socket id
            console.log('%s>%s: %s', '', toUser, message);
        }

    }
};