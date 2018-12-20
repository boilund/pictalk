/* 
  The express app is a global called app
  It can respond on all routes under /api
*/
let app = global.expressApp;

// Set up socket.io
const io = require('socket.io')(
  global.httpServer, 
  {
    path: global.production ? '/api/socket' : '/socket',
    serveClient: false
  }
);

// Basic test of socket.io connectivity
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

