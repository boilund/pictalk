const User = require('../classes/User.class');
const hasha = require('hasha');
const alternativeColor = [
  'default',
  'orangeAvatar',
  'purpleAvatar',
  'pink',
  'green'
];

// after login
exports.loggedin = (req, res) => {
  res.json({ user: req.session.loggedInUser });
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });
  // pick random index (0 ~ 4) for avatarColor
  const index = Math.floor(Math.random() * Math.floor(5));
  const color = alternativeColor[index];

  if (!isUser) {
    const newUser = new User({
      email,
      password,
      nickname: email,
      avatarColor: color
    });
    newUser.save().then(user => {
      req.session.loggedInUser = user;
      res.status(200).json({ success: true, user });
    });
  } else {
    res.status(500).json({ success: false });
    // res.redirect('back');
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
          req.session.loggedInUser = user;
          // set 'groups' data
          User.findOne({ _id: user._id })
            .populate('groups')
            .exec((err, user) => {
              if (err) console.error(new Error(err));
              res.status(200).json({ success: true, user });
            });
        } else {
          res.status(500).json({ success: false });
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};
