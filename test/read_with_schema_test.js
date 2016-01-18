'use strict';

// testing modules
const chai = require('chai')
const chai_as_promised = require('chai-as-promised')
chai.use(chai_as_promised)
const should = chai.should()
const expect = chai.expect

// external modules
const iceworm = require('iceworm')
const iceworm_mongo = require('iceworm-mongo')
iceworm.extend('mongo', iceworm_mongo)

// internal modules
const snowflea = require(__dirname + '/../index.js')


describe("Read with Schema", () => {
  snowflea.database.set('uri', 'mongodb://localhost:27017/test')
  let collection = 'snowflea_test_read_schema'
  let created_items = [];
  before(() => {
    return snowflea.deleteAll(collection)
      .then((count) => {
        return snowflea.createMany(collection, [
          {"name": "Amy Pond", "age": 24, "scottish":true }
        ])
      })
      .then((items) => {
        created_items = items;
      })
      .catch((err) => {
        console.log("ERROR:", err.message);
      })
  })

  after(() => {
    snowflea.deleteAll(collection)
      .then((count) => {})
      .catch((err) => { console.log("Error:", err.message )})
  })

  it(('readOne()'), () => {
    let schema = iceworm.Schema.create({_id: '*mongo.objectid', name:"*string"})
    let options = { schema: schema };
    return snowflea.readOne(collection, options).should.eventually.satisfy((result) => {
      let prop_count = 0;
      for(let prop in result) {
        if(result.hasOwnProperty(prop)) {
          prop_count += 1
        }
      }
      return prop_count == 2;
    })
  })
})
