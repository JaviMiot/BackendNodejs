const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');
const app = express();
const port = 3000;

//* agregas un middle para recibit en json
app.use(express.json());
routerApi(app);

//* en los middleware import el orden
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`My port http://localhost:${port} listening`);
});
