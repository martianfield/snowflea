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

createOne()

function createOne() {
  // let's start by creating a cat
  snowflea.create({name: 'Tom', age: 3, secret: 'hates fish'}, cat_schema)
    .then((result) => {
      console.log('created a cat:', result[0])
    })
    .catch((err) => {
      console.error(err.message)
    })

}


function createLitter() {
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
}


function createInvalid() {
  // let us attempt to create an object that does not follow the schema
  snowflea.create({age:'Johnny'}, cat_schema)
    .then((result) => {
      console.log("this will not happen")
      console.log(result)
    })
    .catch((err) => {
      console.error("ERROR(S):")
      console.error(err)
    })

}

function createProjected() {
  // fields that are not part of the schema will not be saved
  snowflea.create({name:"Timmy", stuff:["this", "will", "not", "save"] }, cat_schema)
    .then((result) => {
      console.log("does not have .stuff")
      console.log(result)
    })
    .catch((err) => {
      console.error("ERROR:")
      console.dir(JSON.stringify(err))
    })
}

