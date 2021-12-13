const passport = require('passport');

const localStrategy = require('./strategies/localStrategies');
const jwtStrategy = require('./strategies/jwtStrategies');

passport.use(localStrategy);
passport.use(jwtStrategy);
