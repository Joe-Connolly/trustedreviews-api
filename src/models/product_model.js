import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  title: String,
  imageURL: String,
  rating: String,
  numReviews: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

ProductSchema.index({ title: 'text', content: 'text' }, { name: 'search' });
const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
// title, image_url, rating, numReviews, product_link
