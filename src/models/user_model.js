import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
  reputation: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  toJSON: {
    virtuals: true,
  },
});
// TODO add index for username
UserSchema.index({ title: 'text', content: 'text' }, { name: 'search' });
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
