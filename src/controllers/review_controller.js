import Review from '../models/review_model';

const { ObjectId } = require('mongoose').Types;

export const createReview = (req, res) => {
  const review = new Review();
  review.title = req.body.title;
  review.content = req.body.content;
  review.tags = req.body.tags;
  review.cover_url = req.body.cover_url;
  console.log('createReview controller');
  review.save()
    .then((result) => {
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
