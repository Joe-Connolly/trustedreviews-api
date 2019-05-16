import mongoose, { Schema } from 'mongoose';


const PostSchema = new Schema({
  title: String,
  cover_url: String,
  content: String,
  tags: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

PostSchema.index({ title: 'text', content: 'text' }, { name: 'search' });
const PostModel = mongoose.model('Post', PostSchema);
export default PostModel;
