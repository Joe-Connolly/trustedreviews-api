/* eslint-disable import/prefer-default-export */
import Product from '../models/product_model';

const { ObjectId } = require('mongoose').Types;


export const createProduct = (req, res) => {
  const product = new Product();
  product.title = req.body.title;
  product.imageURL = req.body.imageURL;
  product.company = req.body.company;
  product.rating = req.body.rating;
  product.numReviews = req.body.numReviews;
  product.description = req.body.description;
  product.save()
    .then((result) => {
      res.json({ message: 'Product created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getProducts = (req, res) => {
  console.log('get all Products controller');
  Product.find({})
    .populate('reviews')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const getProduct = (req, res) => {
  Product.findOne({ _id: new ObjectId(req.params.id) })
    .populate('reviews')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
