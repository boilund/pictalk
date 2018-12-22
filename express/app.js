/* 
  The express app is a global called app
  It can respond on all routes under /api
*/
let app = global.expressApp;

// Connect to mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pictalk');
const db = mongoose.connection;
db.on('error', e => {
  console.error(e);
});
db.once('open', () => {
  console.info('db connected');
});
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

