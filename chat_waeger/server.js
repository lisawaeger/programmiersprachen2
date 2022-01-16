const express = require('express');
const {
  disconnect
} = require('process');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;


app.get('/', (req, res) => {
  //bekommt html file
  res.sendFile(__dirname + '/index.html');
});
//bekommt css file
app.use('/style', express.static(__dirname + '/style'))

/*const getSocketbyUserId = (name) =>{
  let socket = '';
  for(let i = 0; i<clientSocketIds.length; i++) {
    if(clientSocketIds[i].name == name) {
      socket = clientSocketIds[i].socket;
      break;
    }
  }
  return socket;
}
*/
let onlinestatus = true;
const users = [];
const rooms = {
  general: [],
  Iot2: [],
}

class User {
  constructor(username, userId, onlinestatus) {
    this.username = username;
    this.userId = userId;
    this.onlinestatus = onlinestatus
  }
  getUsername() {
    return this.username
  }
  getSocketId() {
    return this.userId
  }
  setStatus() {
    return this.onlinestatus
  }
}

io.on('connection', (socket) => {

  //username anfangs anonym falls jemand keinen namen angibt
  socket.username = 'anonym';

  //userId erstellen
  let userId = '';

  //Raum erstellen
  let roomName = 'general';

  // user ist online
  socket.onlinestatus = true;

  //neuer user wird erstellt
  let newUser = new User(socket.username, socket.userId, socket.onlinestatus);

  //user in array gepusht
  users.push(newUser);

  //username wird bei Eingabe eines Namens überschrieben
  socket.on('change username', (name) => socket.username = name);

  //es wird eine userId vergeben
  socket.on('set socket.id', (userId) => socket.id = userId);

  //gibt keine userId aus???
  console.log(userId)
  //wenn user eine nachricht schreibt wird sie so weitergegeben username: message
  socket.on('message', (msg) => io.emit('message', {
    'user': socket.username,
    'message': msg
  }))

  socket.on('join', (username) => {
    if (username != null) {
      socket.username = username;
      socket.onlinestatus = onlinestatus;
      socket.id = userId;
      socket.roomName = roomName;

      //Willkommensnachricht !Problem soll nur bei user1 angezeigt werden!
      io.to(userId).emit('message', {
        'user': 'Server',
        'message': 'Willkommen ' + socket.username + '!'
      })
    };
    //anderen usern wird angezeigt wenn jemand dem chat beitritt
    socket.broadcast.emit('message', {
      'user': 'Server',
      'message': socket.username + ' ist ' + socket.roomName + ' beigetreten!'
    })
  });

  //wenn ein user die seite verlässt
  socket.on("disconnect", () => {
    console.log('user disconnected');
    io.emit('message', {
      'user': 'Server',
      message: socket.username + ' hat ' + socket.roomName + ' verlassen'
    })
  });

  //
  socket.on('private message', (message) => {
    const privatMessage = {
      type: 'message',
      userId: userId,
      username: username,
      message
    };
  })
})


/*
socket.on ('privat message', ({content, to}) => {
  const privateMessage = {
    from: socket.id,
    to, 
    content,
  };
  socket.to(to).emit('private message', privateMessage);
});
*/

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

