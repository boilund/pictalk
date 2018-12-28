const User = require('../classes/User.class');
const Group = require('../classes/Group.class');

exports.creategroup = (req, res) => {
  console.log('backend');
  const { userId, groupname, members } = req.body;

  const newGroup = new Group({
    userId: userId,
    name: groupname,
    // image:
    members: members,
    open: true
  });
  newGroup
    .save()
    .then(group => {
      User.findOneAndUpdate(
        { _id: req.params._id },
        { $push: { groups: group._id } }
      )
        .then(() => res.status(200).json({ success: true }))
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      throw err;
    });
};
