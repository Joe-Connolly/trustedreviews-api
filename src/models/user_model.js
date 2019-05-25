import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
  reputation: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  toJSON: {
    virtuals: true,
  },
});


UserSchema.virtual('numReviews').get(function () {
  return (this.reviews || []).length;
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
