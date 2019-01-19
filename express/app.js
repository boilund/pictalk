/*
  The express app is a global called app
  It can respond on all routes under /api
*/
const app = global.expressApp;
global.passwordSalt = 'aasölkjadgöl}]23%#¤#%(&';

// Connect to mongoose
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost/pictalk',
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on('error', e => {
  console.error(e);
});
db.once('open', () => {
  console.info('db connected');
});

// BodyParser is needed in order to read req.body
// on PUT and POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// Returns middleware that only parses json
app.use(bodyParser.json());

// Require our REST-based classes
const User = require('./classes/User.class');
const Group = require('./classes/Group.class');
const Photo = require('./classes/Photo.class');
const Comment = require('./classes/Comment.class');

// Set up socket.io (do this before normal middleware and routing!)
const io = require('socket.io')(global.httpServer, {
  path: global.production ? '/api/socket' : '/socket',
  serveClient: false
});

// user sessions for tracking logins
const expressSession = require('express-session');
const connectMongo = require('connect-mongo')(expressSession);
const session = expressSession({
  secret: 'work hard',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  },
  // Spara session i databasen, lever i 30 dagar
  store: new connectMongo({
    mongooseConnection: mongoose.connection,
    ttl: 30 * 24 * 60 * 60
  })
});

// Use express-session middleware for express
app.use(session);

// Use shared session middleware for socket.io
const sharedsession = require('express-socket.io-session');
io.use(
  sharedsession(session, {
    autoSave: true
  })
);

// memory pairing all logged in users to sockets
global.userSocketMem = {};

// use socket.io
io.on('connection', socket => {
  console.log('a user connected to socket');

  socket.on('joinRoom', data => {
    const { room } = data;
    socket.join(room);
  });

  socket.on('leaveRoom', data => {
    const { room } = data;
    socket.leave(room);
  });

  socket.on('comment', async messageFromClient => {
    // Get the user from session
    const user = socket.handshake.session.loggedInUser;
    // Don't do anything if we are not logged in
    if (!user) {
      return;
    }

    const { sender, post, comment, room } = messageFromClient;
    // Save to db
    const newComment = new Comment({
      sender,
      comment,
      room
    });
    await newComment.save();
    await Photo.findOneAndUpdate(
      { _id: post },
      { $push: { comments: newComment } }
    );

    // Send the comment to all the sockets in the room
    io.to(room).emit('comment', {
      post,
      room,
      comment
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const loginCheck = (req, res, next) => {
  if (req.session && req.session.loggedInUser) {
    next();
  } else {
    const err = new Error('You must be logged in to view this page.');
    err.status = 401;
    res.redirect('/login');
  }
};

// Add requires of different routes here
const routes = require('./routes/authentication');
app.get('/loggedin', loginCheck, routes.loggedin);
app.post('/login', routes.login);
app.post('/signup', routes.signup);
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ success: true });
});

const userRoutes = require('./routes/user');
app.get('/users', loginCheck, userRoutes.users);
app.get('/user/:_id', userRoutes.user);

const groupRoutes = require('./routes/group');
// app.post('/create-group', loginCheck, groupRoutes.createGroup);
app.get('/group/:groupId', loginCheck, groupRoutes.fetchGroup);

const photoRoutes = require('./routes/photo');

const multer = require('multer');
// Difine storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('image/')[1]
    );
  }
});
const upload = multer({
  storage: storage,
  limits: {
    // max size of files 10 MB
    fileSize: 10000000
  }
});

// routing
app.post('/image-upload', upload.array('images', 10), (req, res) => {
  const filenames = req.files.map(file => file.filename);
  const newPhoto = new Photo({
    filename: filenames,
    postedGroup: req.body.groupId,
    photographer: req.session.loggedInUser,
    description: req.body.description,
    favorite: false
  });
  newPhoto.save().then(photo => {
    Group.findOneAndUpdate(
      { _id: req.body.groupId },
      { $push: { posts: photo._id } }
    )
      .then(() => res.status(200).json({ success: true }))
      .catch(err => {
        throw err;
      });
  });
});

// Difine storage and file name
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/avatarUploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('image/')[1]
    );
  }
});
const avatarUpload = multer({
  storage: avatarStorage,
  limits: {
    // max size of files 10 MB
    fileSize: 10000000
  }
});

app.post('/create-group', avatarUpload.single('file'), (req, res) => {
  const filename = req.file.filename;
  const { groupname, members, latestUpdateTime } = req.body;

  const newGroup = new Group({
    name: groupname,
    image: filename,
    members: members,
    open: true,
    latestUpdateTime: latestUpdateTime
  });
  newGroup.save().then(group => {
    res.json({ success: true, groupId: group._id });

    group.members.forEach(member => {
      User.findOneAndUpdate({ _id: member }, { $push: { groups: group._id } })
        .then(() => res.status(200))
        .catch(err => {
          throw err;
        });
    });
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: 'error' });
});
