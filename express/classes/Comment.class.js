const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: String,
  date: {
    type: Date,
    default: Date.now()
  },
  room: String
});

module.exports = mongoose.model('Comment', CommentSchema);
