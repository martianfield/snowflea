'use strict'

const snowflea = require(__dirname + '/../index.js')
const Schema = snowflea.Schema

// settings
snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')

// schema
let cat_schema = new Schema(
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
  cat_schema.create({name: 'Tom', age: 3, secret: 'hates fish'})
    .then((result) => {
      console.log('created a cat:', result[0])
    })
    .catch((err) => {
      console.error(err.message)
    })

}


function createLitter() {
  // let's create a litter
  cat_schema.create([
      { name: 'Amy', age: 2, secret: 'lies about her age' },
      { name: 'Cassandra', age: 6, secret: 'has no secrets' }
    ])
    .then((result) => {
      console.log('created cats:', result)
    })
    .catch((err) => {
      console.error(err.message)
    })
}


function createInvalid() {
  // let us attempt to create an object that does not follow the schema
  cat_schema.create({age:'Johnny'})
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
  cat_schemacreate({name:"Timmy", stuff:["this", "will", "not", "save"] })
    .then((result) => {
      console.log("does not have .stuff")
      console.log(result)
    })
    .catch((err) => {
      console.error("ERROR:")
      console.dir(JSON.stringify(err))
    })
}

