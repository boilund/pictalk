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
  places: [String],
  open: Boolean
});

module.exports = mongoose.model('Group', GroupSchema);
