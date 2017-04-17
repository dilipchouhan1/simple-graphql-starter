import User from '../models/user';
import fbConfig from '../../config/facebook';

const FacebookStrategy = require('passport-facebook').Strategy;

export default function(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
    });

    passport.use(new FacebookStrategy({
      clientID        : fbConfig.clientID,
      clientSecret    : fbConfig.clientSecret,
      callbackURL     : fbConfig.callbackURL
    },

    function(token, refreshToken, profile, done) {
      process.nextTick(function() {

        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          if (err)
              return done(err);

          if (user) {
              return done(null, user);
          } else {
            var newUser            = new User();
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

    }));
};
