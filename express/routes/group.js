const User = require('../classes/User.class');
const Group = require('../classes/Group.class');

exports.creategroup = (req, res) => {
  const { groupname, members } = req.body;

  const newGroup = new Group({
    name: groupname,
    // image:
    members: members,
    open: true
  });

  newGroup
    .save()
    .then(group => {
      console.log('group', group.members);
      for (let member of group.members) {
        User.findOneAndUpdate({ _id: member }, { $push: { groups: group._id } })
          .then(() => res.status(200).json({ success: true }))
          .catch(err => {
            throw err;
          });
      }
    })
    .catch(err => {
      throw err;
    });
};
