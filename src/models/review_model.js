import mongoose, { Schema } from 'mongoose';


const ReviewSchema = new Schema({
  body: String,
  username: String,
  rating: Number,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
}, {
  toJSON: {
    virtuals: true,
  },
});

ReviewSchema.index({ title: 'text', content: 'text' }, { name: 'search' });
const ReviewModel = mongoose.model('Review', ReviewSchema);
export default ReviewModel;
