const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
//bekommt html file
res.sendFile(__dirname + '/index.html');});
//bekommt css file
app.use('/style', express.static(__dirname+'/style'))

io.on('connection', (socket) => {
  //username anfangs anonym falls jemand keinen namen angibt
  socket.username = 'anonym';
  //username wird bei Eingabe eines Namens überschrieben
  socket.on('change username', (name) => socket.username = name)
  //wenn user eine nachricht schreibt wird sie so weitergegeben usename: message
  socket.on('message', (msg) => io.emit('message',
  { 'user': socket.username, 'message': msg }))

  socket.on('join', (username) => {
    if (username != null) {
      socket.username = username 
      //Willkommensnachricht !Problem soll nur bei user1 angezeigt werden!
      io.emit ('message',
   {'user': 'Server', 'message': 'Willkommen ' + socket.username + '!'
  })
    }
    //anderen usern wird angezeigt wenn jemand dem chat beitritt
    socket.broadcast.emit('message',
    { 'user': 'Server', 'message': socket.username + ' ist beigetreten!'})
  })
})

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

