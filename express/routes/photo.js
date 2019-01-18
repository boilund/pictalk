const Photo = require('../classes/Photo.class');
const Comment = require('../classes/Comment.class');

// not needed anymore since done by socket in app.js
exports.addComment = (req, res) => {
  const { groupId, postId } = req.params;
  const { comment } = req.body;
  const { _id } = req.session.loggedInUser;

  const newComment = new Comment({
    sender: _id,
    comment: comment,
    room: groupId
  });
  newComment.save().then(c => {
    Photo.findOneAndUpdate({ _id: postId }, { $push: { comments: c } })
      .then(photo => res.status(200).json({ success: true, photo: photo }))
      .catch(err => {
        throw err;
      });
  });
};
