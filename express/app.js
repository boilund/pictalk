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
app.use(session);

const loginCheck = (req, res, next) => {
  if (req.session && req.session.userId) {
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
app.post('/:userId/creategroup', loginCheck, groupRoutes.creategroup);
app.post('/upload', loginCheck, groupRoutes.upload);
