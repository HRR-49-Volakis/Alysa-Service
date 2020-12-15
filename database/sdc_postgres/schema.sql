DROP DATABASE IF EXISTS scrollers;
CREATE DATABASE scrollers;

\c scrollers;

CREATE TABLE products (
  id serial primary key,
  product_name varchar(255) not null,
  image_one_url text not null,
  image_two_url text not null,
  page_url text not null,
  price numeric(6,2) not null,
  hearted boolean not null,
  brief_description text not null,
  collection_name varchar(255) not null
);

CREATE TABLE ratings (
  id serial primary key,
  rated_product int not null,
  stars_given int not null
);

CREATE INDEX idx_brief_description ON products(brief_description);

COPY ratings(rated_product, stars_given)
FROM '/Users/alysashin/Desktop/SDC/other-products-scroll/sdc_postgres/ratings.csv'
DELIMITER ','
CSV HEADER;

COPY products(product_name, image_one_url, image_two_url, page_url, price, hearted, brief_description, collection_name)
FROM '/Users/alysashin/Desktop/SDC/other-products-scroll/sdc_postgres/products.csv'
DELIMITER ','
CSV HEADER;