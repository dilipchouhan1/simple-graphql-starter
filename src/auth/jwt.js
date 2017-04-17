import passportJWT from 'passport-jwt';
import jwtConfig from '../../config/session';
import User from '../models/user';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: jwtConfig.secretOrKey
}

export default (new JwtStrategy(opts, function(jwt_payload, done) {

  User.findOne({id: jwt_payload.sub}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));
