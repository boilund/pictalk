const User = require('../classes/User.class');
const Group = require('../classes/Group.class');

exports.creategroup = (req, res) => {
  const { groupname, members, latestUpdateTime } = req.body;

  const newGroup = new Group({
    name: groupname,
    members: members,
    open: true,
    latestUpdateTime: latestUpdateTime
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

exports.fetchGroup = (req, res) => {
  Group.findOne({ _id: req.params.groupId })
    .populate('members')
    .populate({
      path: 'posts',
      populate: { path: 'comments', populate: { path: 'sender' } }
    })
    .populate({ path: 'posts', populate: { path: 'photographer' } })
    .exec((err, group) => {
      if (err) console.error(new Error(err));
      res.status(200).json({ success: true, group });
    });
  const user = req.session.loggedInUser;
  const socket = userSocketMem[user._id];
  if (socket) {
    console.log('Hurray found the socket the user is connected to!');
    socket.join(req.params.groupId);
    console.log(
      'The user ' + user.nickname + 'joined the room ' + req.params.groupId
    );
  }
};
