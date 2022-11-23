'use strict';
module.exports = (app) => {
  const passport = require('passport');
  // const client = require('../utils/client');

  app.use((req, res, next) => {
    try {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (!user) {
          return next(null);
        }
        const token = req.cookies['api-auth'];
        client
          .get(String(user.id))
          .then((redisUser) => {
            if (!redisUser) return next(null);

            let parsedUserData = JSON.parse(redisUser);
            parsedUserData = parsedUserData[String(user.id)];

            if (parsedUserData && parsedUserData.includes(token)) {
              res.clearCookie('api-auth');
              return res.status(401).json({ message: 'Invalid Token!' });
            } else {
              return next();
            }
          })
          .catch((err) => {
            console.log('Error', err);
            return next(err);
          });
      })(req, res, next);
    } catch (err) {
      console.log('Error: ', err);
      next(err);
    }
  });
};
