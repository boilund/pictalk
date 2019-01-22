const User = require('../classes/User.class');

exports.unread = (req, res) => {
  User.findOne({ _id: req.session.loggedInUser._id })
    .populate({
      path: 'unreadPhotos',
      populate: { path: 'photographer' }
    })
    .populate({
      path: 'unreadPhotos',
      populate: { path: 'postedGroup' }
    })
    .exec((err, user) => {
      if (err) console.error(new Error(err));
      res.status(200).json({ success: true, user });
    });
};
