import Post from '../models/post_model';

const { ObjectId } = require('mongoose').Types;

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.tags = req.body.tags;
  post.cover_url = req.body.cover_url;
  console.log('create post controller hit');
  post.save()
    .then((result) => {
      console.log('post created');
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  Post.findOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const deletePost = (req, res) => {
  Post.find({ _id: new ObjectId(req.params.id) })
    .remove()
    .exec()
    .then((result) => {
      res.json({ message: 'Post deleted!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const updatePost = (req, res) => {
  // inspired by https://coursework.vschool.io/mongoose-crud/
  Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, post) => {
      // Handle any possible database errors
      if (error) res.status(500).json({ error });
      res.json(post);
    },
  );
};

export const searchPosts = (req, res) => {
  console.log(`search posts ${req.params.query}`);
  // inspired by https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose
  Post.find({ $text: { $search: req.params.query } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
