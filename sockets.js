let readyPlayerCount = 0;



function listen(io) {
const pongNameSpace = io.of('/pong');
pongNameSpace.on('connection', (socket) => {
    console.log('A user connected with id', socket.id);
    let room;

    socket.on('ready', () => {
         room = 'room' + Math.floor(readyPlayerCount / 2);
        socket.join(room);

        console.log('Player ready with id', socket.id, room);
        
        readyPlayerCount++;

        if (readyPlayerCount % 2 === 0) {
            pongNameSpace.in(room).emit('startgame', socket.id);    
        } 
    });
    socket.on('paddleMove', (paddleData) => {
        socket.to(room).emit('paddleMove', paddleData);
    });
    socket.on('ballMove', (ballData) => {
        socket.to(room).emit('ballMove', ballData);
    });

    socket.on('disconnect', (reason) => {
        console.log(`Client ${socket.id} disconnected: ${reason}`);
        socket.leave(room);
    });
});

}

module.exports = {
    listen,
}