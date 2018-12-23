/* 
  The express app is a global called app
  It can respond on all routes under /api
*/
const app = global.expressApp;
const bodyParser = require('body-parser');

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

// apply body-parser to get json from frontend correctly
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add requires of different routes here
app.use(bodyParser.json({extended: false}));
require('./routes/signup')(app);

  });
});

