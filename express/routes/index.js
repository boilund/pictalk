const User = require('../classes/User.class');
const hasha = require('hasha');

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
      req.session.userId = user._id;
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
        const hash = hasha(password + global.passwordSalt, {
          encoding: 'base64',
          algorithm: 'sha512'
        });
        if (user.password === hash) {
          req.session.userId = user._id;
          res.status(200).json({ success: true, user });
        } else {
          res.status(500).json({ success: false });
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};
