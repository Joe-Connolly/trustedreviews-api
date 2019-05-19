import { Router } from 'express';
import * as Reviews from './controllers/review_controller';
import * as Products from './controllers/product_controller';
import * as Users from './controllers/user_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our query products 2!' });
});

// /your routes will go here
router.route('/reviews')
  .post(Reviews.createReview)
  .get(Reviews.getReviews);

router.route('/products')
  .post(Products.createProduct)
  .get(Products.getProducts);

router.route('/products/:id')
  .get(Products.getProduct);

router.route('/users')
  .post(Users.createUser);

router.route('/users/:id')
  .get(Users.getUser);

export default router;
