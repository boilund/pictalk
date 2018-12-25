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

const loginCheck = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

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

// Add requires of different routes here
const routes = require('./routes/index');
app.get('/', loginCheck, routes.index);
app.post('/login', routes.login);
app.post('/signup', routes.signup);
app.get('/logout', function(req, res) {
  req.session.destroy();
  console.log('deleted sesstion');
  res.redirect('/');
});

// TODO: need to send only neccesary data
// const userProperty = [_id, nickname, image, favorites, groups, photos];
const User = require('./classes/User.class');
app.get('/users', (req, res) => {
  User.find().then(user => {
    return res.json(user);
  });
});
