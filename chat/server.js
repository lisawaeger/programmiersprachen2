const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');});
app.use('/style', express.static(__dirname+'/style'))

io.on('connection', (socket) => {
  socket.username = 'anonymous';
  socket.on('change username', (name) => socket.username = name)
  socket.on('message', (msg) => io.emit('message',
  { 'user': socket.username, 'message': msg }))
  socket.on('join', (username) => {
    if (username != null) {
      socket.username = username
    }
    socket.broadcast.emit('message',
    { 'user': 'Server', 'message': socket.username + ' has joined!'})
  })
})

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

