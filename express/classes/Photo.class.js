const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  filename: [String],
  postedGroup: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  photographer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  exifData: {
    fileType: String,
    fileSize: String,
    place: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  description: String,
  favorite: Number,
  comments: [
    {
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: String
    }
  ]
});

module.exports = mongoose.model('Photo', PhotoSchema);
