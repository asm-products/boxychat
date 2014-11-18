module.exports = {
    model: 'chat',
    sockets: {
        connected: function(){
            console.log('user connected');

        },
        disconnected :function(){
            console.log('user disconnected');
        },
        chatMessage: function(user, message){
            console.log('%s: %s', user, message);
        },
        privateMessage: function(fromUser, toUser, message) {
            console.log('%s>%s: %s', fromUser, toUser, message);
        }

    }
};