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
          user.facebook.token = token;
          user.save(function(err) {
            if (err)
              throw err;
            return done(null, user);
          });
        } else {
          let newUser            = new User();
          newUser.facebook.id    = profile.id;
          newUser.facebook.token = token;
          newUser.name  = `${profile.name.givenName} ${profile.name.familyName}`;
          newUser.email = profile.emails && profile.emails.length
                          ? profile.emails[0].value
                          : null
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
