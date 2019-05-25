import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


const UserSchema = new Schema({
  reputation: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // googleID: { type: String, required: true, unique: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.pre('save', function beforeUserSave(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;

  bcrypt.compare(candidatePassword, user.password)
    .then((result) => {
      return callback(null, result);
    })
    .catch((error) => {
      return callback(error);
    });
};

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
