import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
  reputation: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  googleID: { type: String, required: true, unique: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.methods.findOrCreate = function findOrCreate(response, callback) {
  // const user = this;
};

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
