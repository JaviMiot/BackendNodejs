const passport = require('passport');

const localStrategy = require('./strategies/localStrategies');

passport.use(localStrategy);
