import mongoose, { Schema } from 'mongoose';

const voting = require('mongoose-voting');

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

ReviewSchema.plugin(voting);

ReviewSchema.virtual('numUpvotes').get(function () {
  return this.vote.positive.length;
});

ReviewSchema.virtual('numDownvotes').get(function () {
  return this.vote.negative.length;
});

ReviewSchema.methods.toDisplayJSON = function toJSON(userUpvoted, userDownvoted) {
  console.log('toDisplayJSON called');
  // return Object.assign({}, this, {
  //   userUpvoted,
  //   userDownvoted,
  // });
};

ReviewSchema.index({ title: 'text', content: 'text' }, { name: 'search' });
const ReviewModel = mongoose.model('Review', ReviewSchema);
export default ReviewModel;
