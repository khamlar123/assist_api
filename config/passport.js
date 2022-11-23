const passport = require('passport');
const passportJwt = require('passport-jwt');
const StrategyJwt = passportJwt.Strategy;

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['api-auth'];
  return token;
};

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
      maxAge: '7d',
      passReqToCallback: true,
    },
    function (req, jwtPayload, done) {
      jwtPayload.iat = undefined;
      return done(null, jwtPayload);
    }
  )
);
