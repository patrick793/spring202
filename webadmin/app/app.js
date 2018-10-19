'use strict';

var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');

//initialize mongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/smart-id', { useNewUrlParser: true }, err => {
  if (err) {
    console.error('Failed to connect to MongoDB');
  } else {
    console.info('Connected to MongoDb');
  }
});

var config = {
    appRoot: __dirname // required config
};

app.use(bodyParser.json({
    limit: '50mb',
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:5000000
}));
app.use('/', express.static(path.join(__dirname, 'frontend')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});

module.exports = app; // for testing
