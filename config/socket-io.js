module.exports = function(server) {
    var io = require('socket.io')(server);

    // Socket.io can be configured here before being loaded in app.js

    io.use(function(socket, next) {
        var handshakeData = socket.request;
        var token = handshakeData._query ? handshakeData._query.token : null;
        Service.token.verify(token, function(err, decoded) {
            if (err) { return next(err); }
            if (!decoded) { return next(new Error('not authorized')); }

            socket.user = {id: decoded.id};

            next();
        });
    });

    return io;
};



