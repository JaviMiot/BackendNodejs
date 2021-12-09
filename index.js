const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  errorSequelize
} = require('./middlewares/errorHandler');

const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

//*agrega passport.js
app.use(passport.initialize());

//* agregas un middle para recibit en json
app.use(express.json());

const whiteList = ['http://localhost:5500', 'https://javimanobanda.com'];

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

const checkApiKey = require('./middlewares/authHandler');

app.get('/', checkApiKey, (req, res) => {
  res.send('nueva ruta');
});


app.use(cors(options));
require('./utils/auth');


routerApi(app);


//* en los middleware import el orden
app.use(logErrors);
app.use(errorSequelize);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`My port http://localhost:${port} listening`);
});
