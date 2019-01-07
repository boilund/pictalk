const User = require('../classes/User.class');
const Group = require('../classes/Group.class');
const pathTo = require('path');
const fs = require('fs');
const jo = require('jpeg-autorotate');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname +
        '-' +
        Date.now() +
        '.' +
        file.mimetype.split('image/')[1]
    );
  }
});
const upload = multer({ storage: storage });

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

exports.upload = (req, res) => {
  const { groupimage } = req.body;
  Group.findById(groupimage.get('id')).then(g => {
    // If group already has an image field, then remove the file
    if (g.image) {
      const pathToImage = pathTo.join(
        __dirname,
        '..',
        'public',
        g.image.slice(1)
      );
      console.log('pathToImage: ', pathToImage);
      fs.unlink(pathToImage, err => {
        if (err) throw err;
        console.log('Deleted file');
      });
    }
    g.image = req.file.path.split('public')[1];
    let joOptions = {};
    jo.rotate(req.file.path, joOptions, function(error, buffer, orientation) {
      if (error) {
        console.log(
          'An error occurred when rotating the file: ' + error.message
        );
        return;
      }
      //console.log('Orientation was: ' + orientation);
      let testPath = req.file.path;
      // upload the buffer to s3, save to disk or more ...
      fs.writeFile(req.file.path, buffer, function(err) {
        if (err) {
          return console.log(err, testPath);
        }
        console.log('The file was saved!', testPath);
      });
    });
    g.save().then(res => {
      res.json({ path: res.image });
    });
  });
};
