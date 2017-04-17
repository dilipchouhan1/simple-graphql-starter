const authCredentials = {
  'clientID'      : '143274286208393',
  'clientSecret'  : '3136009aa7f0ff38606de3bbc053de55',
  'callbackURL'   : precess.env.FACEBOOK_REDIRECT_URI || 'http://localhost:4000/auth/facebook/callback'
};

export default authCredentials;
