const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hasha = require('hasha');

const UserSchema = new Schema({
  password: String,
  nickname: String,
  email: String,
  image: String,
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

// UserSchema.pre('save', function(next) {
//   // hash the password  - but only if it has been modified (or is new)
//   if (this.isModified('password')) {
//     this.password = hasha(this.password + global.passwordSalt, {
//       encoding: 'base64',
//       algorithm: 'sha512'
//     });
//   }
//   next();
// });

module.exports = mongoose.model('User', UserSchema);
