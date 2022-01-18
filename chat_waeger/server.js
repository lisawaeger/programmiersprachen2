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

let onlinestatus = true;
let users = [];
let rooms = [];



class User {
  constructor(username, onlinestatus, socketId) {
    this.username = username;
    this.onlinestatus = onlinestatus;
    this.socketId = socketId;
  }
  getUsername() {
    return this.username
  }
  setStatus() {
    return this.onlinestatus
  }
  getSocketId() {
    return this.socketId
  }

  setUsername(username) {
    this.username = username
  }
}

class Room {
  constructor(roomname) {
    this.roomname = roomname;
    this.socketIds = [];
  }
  getRoomname() {
    return this.roomname
  }
  getSocketIds() {
    return this.socketIds
  }
  addSocketId(socketId) {
    this.socketIds.push(socketId)
  }
}


rooms.push(new Room("general"))

io.on('connection', (socket) => {

  //username anfangs anonym falls jemand keinen namen angibt
  // socket.username = 'anonym';

  //socketid
  // let userId = '';


  //Raum erstellen
  // let roomName = 'general';

  // user ist online
  socket.onlinestatus = true;

  //neuer user wird erstellt
  let newUser = new User('anonym', socket.onlinestatus, socket.id);

  //user in array gepusht
  users.push(newUser);

  rooms.find(room => room.getRoomname() === "general").addSocketId(socket.id);

      // Klasse ausgeben


  //es wird eine userId vergeben
  // socket.on('set socket.id', (userId) => socket.id = userId);

    //warum gibt es keine socket ID aus wenn ich Variable userId benutze????
  console.log('ID: '+ socket.id)

  //wenn user eine nachricht schreibt wird sie so weitergegeben username: message
  socket.on('message', (msg) => {
    console.log(msg);
    const thisRoomsSocketIds = rooms.find(room => room.getRoomname() === msg.roomName).getSocketIds();
    
    for (let x = 0; x < thisRoomsSocketIds.length; x++) {
      io.to(thisRoomsSocketIds[x]).emit('message', {
        'user': newUser.getUsername(),
        'message': msg.text
      });
    }
  })

  socket.on('join', (username) => {
    if (username != null) {
      //socket.username = username;
      //socket.onlinestatus = onlinestatus;
      //socket.userId = userId;
      //socket.roomName = roomName;

      newUser.setUsername(username)
      
      //Willkommensnachricht !Problem soll nur bei user1 angezeigt werden!
      socket.emit('message', {
        'room': 'general',
        'user': 'Server',
        'message': 'Willkommen ' + username + '!'
      })

    };
    //anderen usern wird angezeigt wenn jemand dem chat beitritt
    socket.broadcast.emit('message', {
      'room': 'general', 
      'user': 'Server',
      'message': username + ' ist ' + 'general' + ' beigetreten!'
    })
    console.log(newUser)
  });

  socket.on('joinRoom', (roomName) => {
    if (rooms.find(room => room.getRoomname() === roomName) !== undefined) {
      rooms.find(room => room.getRoomname() === roomName).addSocketId(socket.id);
    } else {
      rooms.find(room => room.getRoomname() === roomName) = new Room(roomName);
      rooms.find(room => room.getRoomname() === roomName).addSocketId(socket.id);
    }
    socket.emit('joinedRoom', roomName);
  })
  

  //wenn ein user die seite verlässt
  socket.on("disconnect", () => {
    console.log('user disconnected');
    io.emit('message', {
      'room': 'general',
      'user': 'Server',
      message: newUser.getUsername() + ' hat ' + 'den Chat' + ' verlassen'
    })
  });
});


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

