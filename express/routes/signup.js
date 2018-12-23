const User = require('../classes/User.class');

// register new user
module.exports = app => {
  app.post('/user/signup', async (req, res) => {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });

    if (!isUser) {
      const newUser = new User({
        email,
        password,
        nickname: 'your nickname'
      });
      newUser.save((err, user) => {
        if (err) res.status(500);
        else res.status(200).json({ success: true, user: user });
      });
    } else {
      res.status(500).json({ success: false, email: email });
    }
  });
};
