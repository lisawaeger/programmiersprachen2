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

const getSocketbyUserId = (name) =>{
  let socket = '';
  for(let i = 0; i<clientSocketIds.length; i++) {
    if(clientSocketIds[i].name == name) {
      socket = clientSocketIds[i].socket;
      break;
    }
  }
  return socket;
}

let onlinestatus = true;
const connectedUsers = [];
const users = [];

class user {
  constructor(username, socketId, onlinestatus){
    this.username = username;
    this.socket = socketId;
    this.status = status
  }
  getUsername() {
    return this.username
  }
  getSocketId(){
    return this.socketId
  }
  setStatus(){
    return this.onlinestatus
  }
}


io.on('connection', (socket) => {
  //username anfangs anonym falls jemand keinen namen angibt
  socket.username = 'anonym';
  socket.onlinestatus = true;
  //username wird bei Eingabe eines Namens überschrieben
  socket.on('change username', (name) => socket.username = name)
  //wenn user eine nachricht schreibt wird sie so weitergegeben usename: message
  socket.on('message', (msg) => io.emit('message',
  { 'user': socket.username, 'message': msg }))

  socket.on('join', (username) => {
    if (username != null && onlinestatus != true) {
      socket.username = username 
      users.push(user)
      socket.onlinestatus = onlinestatus
      connectedUsers.push(user)
      //Willkommensnachricht !Problem soll nur bei user1 angezeigt werden!
      io.emit ('message',
   {'user': 'Server', 'message': 'Willkommen ' + socket.username + '!'
  });

    }
    //anderen usern wird angezeigt wenn jemand dem chat beitritt
    socket.broadcast.emit('message',
    { 'user': 'Server', 'message': socket.username + ' ist beigetreten!'})
  })
  //wenn ein user die seite verlässt
  socket.on("disconnect", () => {
    this.onlinestatus == false;
    users = users.filter(this.onlinestatus == false);
    io.emit('message', 'Ein User hat den Chat verlassen'
    )
  })
})


/* 

let users = [];

    // class for Groupchat
    class rooms {
      constructor(general, random){
      this.general = general;
      this.random = random
      };
    } 

    io.on('connection', (socket) => { socket.on("join server",(username)=> {
  const user = {
    username,
    id: socket.id,
  };
  users.push(user);
  io.emit("new user", users);
});
socket.on("join room",(roomName, cb)=>{
  socket.join(roomName);
  cb(messages[roomName]);
  });

  socket.on("send message", ({content, to, username, chatName, Channel})=>{
    if (Channel) {
      const history = {
        content,
        chatName,
        username,
      };
      socket.to(to).emit("new message",history);
    } else {
        const history = {
          content, 
          chatName: username,
          username
        };
        socket.to(to).emit("new message", history)
      };
      if(messages[chatName]) {
        messages[chatName].push({
          username,
          content
        })
      }
  });
  socket.on("disconnect", () => {
    users = users.filter(u => u.id !== socket.id);
  })
}); */

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

