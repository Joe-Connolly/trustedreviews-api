import Review from '../models/review_model';
import Product from '../models/product_model';

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
        }
      });
      res.json({ message: 'Review created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getReviews = (req, res) => {
  console.log('getReview controller');
  Review.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
