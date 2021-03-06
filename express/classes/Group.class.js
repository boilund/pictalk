const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: String,
  image: String,
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Photo'
    }
  ],
  places: [String],
  open: Boolean,
  latestUpdateTime: Number
});

module.exports = mongoose.model('Group', GroupSchema);
