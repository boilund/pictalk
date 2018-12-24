const User = require('../classes/User.class');

// after login
exports.index = (req, res) => {
  res.render('index', { user: req.session.user });
  console.log(req.session.user);
};

// signup(register user)
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });

  if (!isUser) {
    const newUser = new User({
      email,
      password,
      nickname: email
    });
    newUser.save().then(user => {
      console.log(user);
      // req.session.userId = user._id;
      res.status(200).json({ success: true, user });
      // .redirect('/album');
    });
  } else {
    res.redirect('back');
  }
};

// login function
exports.login = (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  const query = { email: email, password: password };
  User.find(query, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data === '') {
      res.render('login');
    } else {
      req.session.user = email;
      res.redirect('/');
    }
  });
};
