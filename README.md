# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## CRUD

URLs prefixed with /api/product_scroller

| Action          | Method           | URL   |
| :------------- |:----------------:|:-----|
| Create a new product | POST | /product |
| Retrieve similar products  | GET | /products/similar/id=:id |
| Retrieve products in the same collection | GET | /products/collection/id=:id |
| Retrieve number of ratings | GET | /ratings/count/product_id=:id |
| Retrieve average rating | GET | /ratings/avg/product_id=:id |
| Update product information  | PUT | /products/id=:id|
| Delete a product | DELETE | /products/id=:id |
