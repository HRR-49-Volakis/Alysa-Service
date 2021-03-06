const mongo = require('mongodb');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/sliders';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('------Database created-----');
  }
})

const db = mongoose.connecton;

db.once('open', function() {
  console.log('MongoDB connection successful');
})

const productSchema = new mongoose.Schema({
  id: Number,
  product_name: String,
  image_one_url: String,
  image_two_url: String,
  page_url: String,
  price: Number,
  hearted: Boolean,
  brief_description: String,
  collection_name: String
})

productSchema.index({ id: 1});
productSchema.index({brief_description: 1});

const ratingSchema = new mongooose.Schema({
  id: Number,
  rated_product: Number,
  stars_given: Number
})

ratingSchema.index({ id: 1 });

const Product = mongoose.model('Product', productSchema);
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = {
  db,
  Rating,
  Product
}