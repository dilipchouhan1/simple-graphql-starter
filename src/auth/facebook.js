import User from '../models/user';
import fbConfig from '../../config/facebook';

const FacebookStrategy = require('passport-facebook').Strategy;

export default (new FacebookStrategy(fbConfig,
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
        if (err)
            return done(err);
        if (user) {
            return done(null, user);
        } else {
          let newUser            = new User();
          newUser.facebook.id    = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.save(function(err) {
            if (err)
                throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }
));
