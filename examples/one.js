'use strict'

const snowflea = require(__dirname + '/../index.js')

// settings
snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')

// schema
let cat_schema = snowflea.Schema.create(
  {
    name: '*string',
    age: 'int>0',
    secret: '-string'
  },
  {
    collection: 'cats'
  }
)

// let's start by creating a cat
snowflea.create({ name: 'Tom', age: 3, secret: 'hates fish' }, cat_schema)
  .then((result) => {
    console.log('created a cat:', result[0])
  })
  .catch((err) => {
    console.error(err.message)
  })


// let's create a litter
snowflea.create([
    { name: 'Amy', age: 2, secret: 'lies about her age' },
    { name: 'Cassandra', age: 6, secret: 'has no secrets' }
  ], cat_schema)
  .then((result) => {
    console.log('created cats:', result)
  })
  .catch((err) => {
    console.error(err.message)
  })
