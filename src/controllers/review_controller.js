import Review from '../models/review_model';
import Product from '../models/product_model';
import User from '../models/user_model';

const { ObjectId } = require('mongoose').Types;

export const createReview = (req, res) => {
  const review = new Review();
  review.username = req.body.username;
  review.rating = req.body.rating;
  review.body = req.body.body;
  review.product = req.body.product;
  console.log('createReview controller');
  review.save()
    .then((result) => {
      Product.findOne({ _id: new ObjectId(review.product) }, (err, product) => {
        if (product) {
          product.reviews.push(review);
          product.save();
          User.findOne({ username: review.username }, (err, user) => {
            if (user) {
              user.reviews.push(review);
              user.save();
              console.log('saves');
              res.json({ message: 'Review created!' });
            }
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getReviews = (req, res) => {
  console.log('getReview controller');
  Review.find({})
    .populate('product')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const vote = (req, res) => {
  const { voteType } = req.params;
  const { username } = req.body;
  const { reviewID } = req.body;
  let user;
  let review;
  User.findOne({ username }).then((result) => {
    user = result;
    return Review.findOne({ _id: new ObjectId(reviewID) });
  })
    .then((result) => {
      review = result;
      if (voteType === 'upvote') {
        review.upvote(user);
      } else if (voteType === 'downvote') {
        review.downvote(user);
      }
      review.save();
      return Product.findOne({ _id: new ObjectId(review.product) })
        .populate('reviews');
    })
    .then((product) => {
      res.json({ product });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
