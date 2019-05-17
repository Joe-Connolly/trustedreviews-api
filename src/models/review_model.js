import mongoose, { Schema } from 'mongoose';


const ReviewSchema = new Schema({
  title: String,
  cover_url: String,
  content: String,
  tags: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

ReviewSchema.index({ title: 'text', content: 'text' }, { name: 'search' });
const ReviewModel = mongoose.model('Review', ReviewSchema);
export default ReviewModel;
