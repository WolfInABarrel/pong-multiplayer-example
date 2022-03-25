const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const PORT = 8000;

server.listen(PORT);
console.log(`Listening on port ${PORT}`);

let readyPlayerCount = 0;

io.on('connection', (socket) => {
    console.log('A user connected with id', socket.id);

    socket.on('ready', () => {
        console.log('Player ready with id', socket.id);
        
        readyPlayerCount++;

        if (readyPlayerCount === 2) {
         io.emit('startgame', socket.id);    
        } 
    });
    socket.on('paddleMove', (paddleData) => {
        socket.broadcast.emit('paddleMove', paddleData);
    })
    socket.on('ballMove', (ballData) => {
        socket.broadcast.emit('ballMove', ballData);
    })
});