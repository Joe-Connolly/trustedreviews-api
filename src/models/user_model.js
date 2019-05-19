import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
  reputation: String,
  username: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.index({ title: 'text', content: 'text' }, { name: 'search' });
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
