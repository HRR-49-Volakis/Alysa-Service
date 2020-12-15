const faker = require('faker');
const fs = require('fs');
const mongoose = require('mongoose');
const imagePool = require('../database/imagePool.js');

function generateCSV (writer, func, header, encoding, callback) {

  var lines = 10000000;
  var data;
  var id = 0;

  writer.write(header, encoding);

  function write () {
    var ok = true;
    do {
      id++;
      lines--;
      var id_str = id.toString();
      data = id_str + ',' + func();
      if (lines === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (lines > 0 && ok);

    if (lines > 0) {
      writer.once('drain', write);
    }

  }

  write();
}

const randomRating = function () {

  var data = '';

  var rated = faker.random.number({ min: 1, max: 100});
  var stars = faker.random.number({ min: 1, max: 5});

  data += rated + ',' + stars + '\n';
  return data;
}

function addRandomImagePair() {
  var data = {};
  const keys = Object.keys(imagePool);
  const urls = imagePool[keys[Math.floor(Math.random() * keys.length)]];
  data.image_one_url = urls.url_one;
  data.image_two_url = urls.url_two;
  return data;
}

const randomProduct = function () {
  var data = '';
  var images = addRandomImagePair();

  var product_name = faker.commerce.product();
  var image_one_url = images.image_one_url;
  var image_two_url = images.image_two_url;
  var page_url = 'https://www.ikea.com/au/en/p/djungelskog-soft-toy-brown-bear-20402831/';
  var price = ((faker.random.number(40) * 5) + 10);
  var hearted = faker.random.boolean();
  var brief_description = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.random.number(50)} cm`;
  var collection_name = faker.commerce.department();

  data += product_name + ',' + image_one_url + ',' + image_two_url + ',' + page_url + ',' + price + ',' + hearted + ',' + brief_description + ',' + collection_name + '\n';

  return data;
}

function complete () {
  console.log('CSV completed');
}

//----ratings------------
var ratingWriter = fs.createWriteStream('./ratings.csv');
var ratingHeader = 'id, rated_product, stars_given\n';
generateCSV(ratingWriter, randomRating, ratingHeader, 'utf-8', complete);

//------products-------------
var productWriter = fs.createWriteStream('./products.csv');
var productHeader = 'id, product_name, image_one_url, image_two_url, page_url, price, hearted, brief_description, collection_name\n';
generateCSV(productWriter, randomProduct, productHeader, 'utf-8', complete);
