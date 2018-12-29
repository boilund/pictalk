const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hasha = require('hasha');

const UserSchema = new Schema({
  password: String,
  nickname: String,
  email: String,
  image: String,
  avatarColor: String,
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    }
  ],
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Photo'
    }
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Photo'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

// hashing a password before saving it to the database
// - but only if it has been modified (or is new)
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = hasha(this.password + global.passwordSalt, {
      encoding: 'base64',
      algorithm: 'sha512'
    });
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
