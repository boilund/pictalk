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

exports.updateUnread = (req, res) => {
  const { unreadPhotos } = req.body;
  User.findOneAndUpdate(
    { _id: req.session.loggedInUser._id },
    { $set: { unreadPhotos } }
  )
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

exports.favorite = (req, res) => {
  User.findOne({ _id: req.session.loggedInUser._id })
    .populate({
      path: 'favorites',
      populate: { path: 'photographer' }
    })
    .populate({
      path: 'favorites',
      populate: { path: 'postedGroup' }
    })
    .exec((err, user) => {
      if (err) console.error(new Error(err));
      res.status(200).json({ success: true, user });
    });
};

exports.updateFavorite = (req, res) => {
  const { favorites } = req.body;
  User.findOneAndUpdate(
    { _id: req.session.loggedInUser._id },
    { $set: { favorites } }
  )
    .populate({
      path: 'favorites',
      populate: { path: 'photographer' }
    })
    .populate({
      path: 'favorites',
      populate: { path: 'postedGroup' }
    })
    .exec((err, user) => {
      if (err) console.error(new Error(err));
      res.status(200).json({ success: true, user });
    });
};
