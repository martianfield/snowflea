/*
'use strict';
const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
chai.use(chai_as_promised);

const should = chai.should();
const expect = chai.expect;
const snowflea = require(__dirname + '/../index.js');

describe("Update", () => {

  let collection = 'snowflea_test_update';
  let created_item = [];
  snowflea.database.set('uri', 'mongodb://localhost:27017/test');

  beforeEach(() => {
    return snowflea.deleteAll(collection)
      .then((count) => {
        return snowflea.createOne(collection, {"name": "Bonnie", "age": 24})
      })
      .then((item) => {
        created_item = item;
      })
      .catch((err) => {
        console.log("ERROR:", err.message);
      })
  })

  it(('updateOne()'), () => {
    let filter = { "_id": created_item._id}
    let data = {"name" : "Johnny"}
    snowflea.updateOne(collection, filter, data)
      .then((result) => {
        console.log("D", result)
        result.matchedCount.should.equal(2)
        result.modifiedCount.should.equal(2)
      })
  })
})
*/