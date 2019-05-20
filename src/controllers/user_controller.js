/* eslint-disable import/prefer-default-export */
// import jwt from 'jwt-simple';
// import dotenv from 'dotenv';
// import User from '../models/user_model';
import Product from '../models/product_model';
import User from '../models/user_model';

const { ObjectId } = require('mongoose').Types;

// dotenv.config({ silent: true });


// export const signin = (req, res, next) => {
//   res.send({ token: tokenForUser(req.user) });
// };

// export const signup = (req, res, next) => {
//   const { email } = req.body;
//   const { password } = req.body;
//   const { username } = req.body;
//   console.log(req);
//   console.log(`top of signup controllers ${username}`);
//   if (!email || !password) {
//     return res.status(422).send('You must provide email and password');
//   }

//   // 🚀 TODO: Get rid of ObjectId
//   // here you should do a mongo query to find if a user already exists with this email.
//   // if user exists then return an error. If not, use the User model to create a new user.
//   return User.find({ email }, (err, docs) => {
//     if (docs.length) {
//       return res.status(422).send('A user with that email already exists'); // TODO update error code
//     } else {
//       const user = new User();
//       user.email = email;
//       user.password = password;
//       user.username = username;
//       // Save the new User object
//       console.log('before user.save()');
//       return user.save()
//         .then((result) => {
//           console.log('user is saved');
//           console.log(result);
//           // return a token same as you did in in signin
//           console.log('user created');
//           // res.json({ message: 'Sending JSON from signup' });
//           res.send({ token: tokenForUser(result) });
//         })
//         .catch((error) => {
//           console.log(error);
//           res.status(500).json({ error });
//         });
//     }
//   });
// };

// // encodes a new token for a user object
// function tokenForUser(user) {
//   const timestamp = new Date().getTime();
//   return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
// }

export const createUser = (req, res) => {
  const user = new User();
  user.reputation = req.body.reputation;
  user.username = req.body.username;
  user.email = req.body.email;
  console.log('email unique');
  user.save()
    .then((result) => {
      res.json({ message: 'User created!', result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const getUser = (req, res) => {
  console.log('getProduct controller');
  User.findOne({ username: req.params.username })
    .populate({ path: 'reviews', populate: { path: 'product' } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// export const getUsers = (req, res) => {
//   console.log('getProduct controller');
//   User.find({})
//     .populate({ path: 'reviews', populate: { path: 'product' } })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };
