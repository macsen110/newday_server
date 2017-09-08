module.exports = function (server) {
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on('chat', function (id, data) {
            socket.broadcast.emit('chat', data); 
        })
    });
}
