module.exports = {
  'local': {
    'provider': 'local',
    'module': 'passport-local',
    'usernameField': 'email',
    'passwordField': 'password',
    'authPath': '/auth/local',
    'callbackHTTPMethod': 'post',
    'successRedirect': '/auth',
    'failureRedirect': '/login',
    'failureFlash': true,
    'setAccessToken': true
  },
  'github': {
    'provider': 'github',
    'module': 'passport-github',
    'strategy': 'OAuth2Strategy',
    'clientID': process.env.GITHUB_CLIENT_ID,
    'clientSecret': process.env.GITHUB_CLIENT_SECRET,
    'callbackURL': process.env.GITHUB_CALLBACK_URL,
    'authPath': '/auth/github',
    'callbackPath': '/auth/github/callback',
    'successRedirect': '/auth',
    'failureRedirect': '/login',
    'scope': ['email', 'profile'],
    'failureFlash': true,
    'setAccessToken': true
  }
};
