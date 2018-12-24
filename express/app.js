/* 
  The express app is a global called app
  It can respond on all routes under /api
*/
const app = global.expressApp;

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

  });
});

