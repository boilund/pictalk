const User = require('../classes/User.class');

// TODO: need to send only neccesary data
// const userProperty = [_id, nickname, image, favorites, groups, photos];
exports.users = (req, res) => {
  User.find().then(users => {
    res.status(200).json({ success: true, users });
  });
};

exports.user = (req, res) => {
  User.findOne({ _id: req.params._id })
    .populate('groups')
    .exec((err, user) => {
      if (err) console.error(new Error(err));
      res.status(200).json({ success: true, user });
    });
};
