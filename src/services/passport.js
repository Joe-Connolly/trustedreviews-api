// lets import some stuff
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as TokenStrategy } from 'passport-google-token';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};

const tokenOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/login/cb',
  passReqToCallback: true,
};

const googleCB = (request, accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ accessToken, refreshToken, profile }, (err, user) => {
    if (err) {
      done(err);
    } else if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
};

const jwtCB = (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      done(err, false);
    } else if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
};

const tokenLogin = new TokenStrategy(tokenOptions, googleCB);
const jwtLogin = new JwtStrategy(jwtOptions, jwtCB);

// Tell passport to use this strategy
passport.use(tokenLogin);
passport.use(jwtLogin);

export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignIn = passport.authenticate('google-token');
