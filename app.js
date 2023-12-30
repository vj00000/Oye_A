const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiControllers = require('./controller/apiControllers');

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// API routes
apiControllers(app);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});