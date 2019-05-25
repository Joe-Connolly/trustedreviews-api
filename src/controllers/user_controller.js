import User from '../models/user_model';


export const createUser = (req, res) => {
  const user = new User();
  user.reputation = req.body.reputation;
  user.username = req.body.username;
  user.email = req.body.email;
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
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
