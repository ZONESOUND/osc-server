const http = require('http');
const socketio = require('socket.io');
const port = process.env.PORT || 8000

const server = http.createServer((req, res) => {
    res.end('connected!')
});

const io = socketio(server);

io.on('connection', (socket, req) => {

    socket.on('osc', (data) => {
        console.log(data);
        io.emit('osc', data);
        //io.emit(data.address, data.args[0].value);
    })

    socket.on('connected', (data) => {
        console.log("connected");
    })

    socket.on('disconnected',(data) => {
        console.log('disconnectd')
        
    })

    socket.on("*",function(event,data) {
        console.log(event);
        console.log(data);
    });

})

server.listen(port, function listening() {
    console.log("Listening on %d", server.address().port);
});
