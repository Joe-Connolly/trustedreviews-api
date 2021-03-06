/* eslint-disable import/prefer-default-export */
import Product from '../models/product_model';

const { ObjectId } = require('mongoose').Types;

// helper method for getProducts and searchProducts
const getAllProducts = (res) => {
  Product.find({})
    .populate('reviews')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createProduct = (req, res) => {
  const product = new Product();
  console.log('body', req.body);
  product.title = req.body.title;
  product.imageURL = req.body.imageURL;
  product.URL = req.body.url;
  product.company = req.body.company;
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
  getAllProducts(res);
  console.log('test');
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

export const searchProducts = (req, res) => {
  const { searchTerm } = req.query;
  if (searchTerm === '') {
    getAllProducts(res);
  } else {
    Product.find({ $text: { $search: searchTerm } })
      .populate('reviews')
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};
