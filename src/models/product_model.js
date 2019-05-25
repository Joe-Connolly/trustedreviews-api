import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  title: String,
  imageURL: String,
  URL: String,
  company: String,
  rating: String,
  numReviews: String,
  description: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
  toJSON: {
    virtuals: true,
  },
});


ProductSchema.index({ title: 'text', company: 'text', description: 'text' }, { name: 'search' });
const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
