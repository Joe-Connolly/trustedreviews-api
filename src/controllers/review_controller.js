/* eslint-disable array-callback-return */
import Review from '../models/review_model';
import Product from '../models/product_model';
import User from '../models/user_model';

const { ObjectId } = require('mongoose').Types;

export const createReview = (req, res) => {
  console.log('top of new review controller');
  const review = new Review();
  review.username = req.body.username;
  review.rating = req.body.rating;
  review.body = req.body.body;
  review.product = req.body.product;
  User.findOne({ username: review.username })
    .populate('reviews')
    .then((user) => {
      if (user) {
        let userAlreadyReviewed = false;
        // check if user already reviewed the same product
        user.reviews.map((pastReview) => {
          console.log(`${pastReview.product}  ${review.product}  ${pastReview.product.equals(review.product)}`);
          if (pastReview.product.equals(review.product)) {
            userAlreadyReviewed = true;
          }
        });
        if (userAlreadyReviewed) {
          console.log('user already reviewed this product');
          throw new Error('cannot save review, user already reviewed this product');
        } else {
          user.reviews.push(review);
          user.save();
        }
      }
      return Product.findOne({ _id: new ObjectId(review.product) });
    })
    .then((product) => {
      console.log('looking for product');
      if (product) {
        console.log('found product');
        product.reviews.push(review);
        product.ratingSum += review.rating;
        product.save();
        // now finally we can actually save the review
        review.save();
        res.json({ message: 'Review created!' });
      }
    })
    .catch((error) => {
      res.status(422).json({ error });
      console.log(error);
    });
};


export const getReviews = (req, res) => {
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
