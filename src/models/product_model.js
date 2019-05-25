import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  title: String,
  imageURL: String,
  URL: String,
  company: String,
  description: String,
  ratingSum: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  toJSON: {
    virtuals: true,
  },
});

ProductSchema.virtual('numReviews').get(function () {
  return this.reviews.length;
});

ProductSchema.virtual('rating').get(function () {
  console.log('rating');
  console.log(this.ratingSum);
  console.log(this.reviews);
  return (this.ratingSum / (this.reviews.length || 1.0)).toFixed(1);
});


ProductSchema.index({ title: 'text', content: 'text' }, { name: 'search' });
const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
