// Modules
// Create a http-server with a request listener
var app = require('http').createServer(handler)
// To access the file system
var fs = require('fs');

const _allUsers = [];

// Make the http-server listen
app.listen(80);
console.log( "Webserver is listening on Port 80" );
// Serving the site - create a http-response
function handler (req, res) {
  // req contains:
  console.log( "Request method: " + req.method );
  console.log( "Requested URL: " + req.url );
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
  else if( req.method === "POST") {
      console.log("I got a post request");

      const requestBody = [];
      req.on('data', (incomingDataPackage) => {
          requestBody.push (incomingDataPackage); 
        } );

        req.on('end' , () => {

        let username = requestBody.toString().split("=")[1];
        _allUsers.push(username);
        console.log ( "Username = " + username);

        res.writeHead(200);
        let htmlData = "<html><head><title>Welcome</title></head><body><h2>Welcome " + username + "</h2><p>You can chat with " + _allUsers + "</body></html>";
        res.end(htmlData);
        });
     }
  }

  
