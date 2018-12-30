const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  postedGroup: String,
  photographer: String,
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
      username: String,
      comment: String
    }
  ]
});

module.exports = mongoose.model('Photo', PhotoSchema);
