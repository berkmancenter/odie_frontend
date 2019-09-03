## Introduction

Online Discourse Insight Explorer

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```

## Docker

The application can be developed and deployed using Docker.

### Development

Run:

`docker-compose up`

It will build the application and automatically reload after every code change.

You can see the application running at http://localhost:8080.

### Deployment

Run:

`docker-compose -f docker-compose.yml -f docker-compose.production.yml up`

It will build the application and serve it using nginx on http://localhost:7777.

## Copyright

Copyright (c) 2018 President and Fellows of Harvard College
