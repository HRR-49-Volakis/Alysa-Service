require('newrelic');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/products.js');
const ratingsController = require('./controllers/ratings.js');

const publicFolder = path.join(__dirname, '/../public/');
const app = express();

app.use(bodyParser.json());

app.get('/api/product_scroller/products', productsController.getAll);
app.get('/api/product_scroller/products/id=:id', productsController.getById);
app.get('/api/product_scroller/products/similar/id=:id', productsController.getSimilarDescription);
app.get('/api/product_scroller/products/collection/id=:id', productsController.getSimilarCollection);

app.get('/api/product_scroller/ratings', ratingsController.getAll);
app.get('/api/product_scroller/ratings/count/product_id=:id', ratingsController.getCountByProduct);
app.get('/api/product_scroller/ratings/avg/product_id=:id', ratingsController.getAvgRatingByProduct);

app.use(express.static(publicFolder));

module.exports = {
  app,
};
