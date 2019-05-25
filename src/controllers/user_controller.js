import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });


export const createUser = (req, res) => {
  const user = new User();
  user.reputation = req.body.reputation;
  user.username = req.body.username;
  user.email = req.body.email;
  user.googleID = req.body.googleID;
  user.save()
    .then((result) => {
      res.json({ message: 'User created!', result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const getUser = (req, res) => {
  User.findOne({ username: req.params.username })
    .populate({ path: 'reviews', populate: { path: 'product' } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const findOrCreate = (req, res) => {
  const { googleID } = req.body.profile;
  const { username } = req.body.profile.displayName;
  const { email } = req.body.profile.emails;

  User.findOne({ googleID: req.body.profile.id })
    .then((result) => {
      if (!result) {
        const user = new User();
        user.googleID = googleID;
        user.username = username;
        user.email = email;
        user.save()
          .then(() => {
            res.send({ token: tokenForUser(user) });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
