/* eslint-disable import/prefer-default-export */
import Product from '../models/product_model';


export const createProduct = (req, res) => {
  const product = new Product();
  product.title = req.body.title;
  console.log('createProduct controller');
  product.save()
    .then((result) => {
      res.json({ message: 'Product created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getProducts = (req, res) => {
  console.log('getProduct controller');
  Product.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
