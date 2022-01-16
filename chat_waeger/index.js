const io = require('socket.io')(http);

rooms = [{general}, {IoT2}];
var socket = null;

var app = new Vue({
  // State 0: Username aussuchen
  // State 1: chatten
  el: '#app',
  data: {
    messages: [],
    message: '',
    username: '',
    state: 0
  },
  methods: {
    //funktion um die eingegebene Nachricht an vue weiterzugeben und anzuzeigen
    sendMessage: function () {
      socket.emit('message', this.message);
      this.message = '';
    },
    //funktion um den eingegebenen Username an vue weiterzugeben und anzuzeigen
    setUsername: function () {
      socket.emit('join', this.username);
      this.username = '';
      this.state = 1;
    }
  },
  created: function () {
    socket = io();
  },
  mounted: function () {
    //socket hört auf message
    socket.on('message', function (message) {
      //Pusht den Input von message in das Array messages
      app.messages.push(message);
      // soll immer an das Ende scrollen um die neuste nachricht anzuzeigen
      app.$nextTick(function () {
        var messageBox = document.getElementById('chatbox');
        messageBox.scrollTop = messageBox.scrollHeight;
      });
    })
  }
});