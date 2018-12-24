const User = require('../classes/User.class');

// after login
exports.index = (req, res) => {
  res.render('index', { user: req.session.user });
  console.log(req.session.user);
};

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

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(500).redirect('back');
      } else {
        // req.session.user = email;
        res.status(200).json({ success: true, user });
        // res.redirect('/');
      }
    })
    .catch(err => {
      console.log(err);
    });
};
