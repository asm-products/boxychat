module.exports = function(server, app) {
    var io = require('socket.io')(server);

    // Socket.io can be configured here if necessary before being loaded in app.js

    return io;
};



