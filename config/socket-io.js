module.exports = function(server, secrets) {
    var io = require('socket.io')(server);

    // Socket.io can be configured here before being loaded in app.js

    io.use(function(socket, next) {
        var handshakeData = socket.request;
        var token = handshakeData.query ? handshakeData.query.token : null;
        Service.token.verify(token, secrets.token, function(err, decoded) {
            if (err) { return next(err); }
            if (!decoded) { return next(new Error('not authorized')); }

            handshakeData.userId = decoded.id;

            next();
        });
    });

    return io;
};



