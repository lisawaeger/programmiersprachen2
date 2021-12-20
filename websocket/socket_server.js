// Stellt diese Webseite bereit
// http://127.0.0.1:80/index.html
// Modules
// Create a http-server with a request listener
var app = require('http').createServer(handler)

// Create a socket.io instance and bind it to the http-server
var io = require('socket.io')(app);

// To access the file system
var fs = require('fs');

// Save all usernames
const _usernames = [];

// Make the http-server listen
app.listen(80);
console.log( "Webserver is listening on Port 80" );

// Serving the site - create a http-response
function handler (req, res) {
  // Create the response:
  if (req.method === "GET") {
    // Read the file
    fs.readFile(__dirname + '/index.html', function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      // Send Response
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
}

// Listening to connections and define the events
io.on('connection', function (socket) {

  // New connection attempt
  console.log( "Connection from client " + socket.id );

  socket.on("submittingUserName", function (username) {
      console.log(username);

      //Save user name
      _usernames.push(username);

      let htmlData = "<h2>Welcome " + username + "</h2><p id ='usernames'>You can chat with " + _usernames + "</p>"
      socket.emit("welcome", htmlData);

      io.emit("updateUser", _usernames);
  });

});



