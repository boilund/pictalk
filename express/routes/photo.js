const Photo = require('../classes/Photo.class');

exports.addComment = (req, res) => {
  const { userId, comment } = req.body;

  Photo.findOneAndUpdate(
    { _id: req.params.photoId },
    { $push: { comments: { sender: userId, comment: comment } } }
  )
    .then(photo => res.status(200).json({ success: true, photo: photo }))
    .catch(err => {
      throw err;
    });
};
