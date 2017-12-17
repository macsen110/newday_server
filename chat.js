module.exports = function (server) {
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on('chat', function (id, data) {
            console.log('data' + data)
            socket.broadcast.emit('chat', data); 
        })
    });
}
