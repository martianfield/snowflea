'use strict';
const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const snowflea = require(__dirname + '/../index.js')

describe("Delete", () => {
  let cat_schema
  before((done) => {
    snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')
    cat_schema = snowflea.Schema.create(
      {
        name: '*string'
      },
      {
        collection: 'snowflea_cats'
      }
    )
    let objs = [
      {"name": "Tam"}, {"name": "Tom"}, {"name": "Tim"}
    ]
    snowflea.create(objs, cat_schema)
      .then(() => {
        done()
      })
      .catch((err) => {
        done(new Error(err.message))
      })
  })

  after((done) => {
    snowflea.drop(cat_schema.options.collection)
      .then((result) => {
        done()
      })
      .catch((err) => {
        done(new Error("Unexepcted Error:", err.message))
      })
  })

  it("delete one", (done) => {
    return snowflea.delete({"name":"Tam"}, cat_schema)
      .then((result) => {
        result.count.should.equal(1)
        done()
      })
      .catch((err) => {
        done(new Error("received unexpected error: " + err.message))
      })
  })

  it("delete all", (done) => {
    return snowflea.delete({}, cat_schema)
      .then((result) => {
        result.count.should.equal(2)
        done()
      })
      .catch((err) => {
        done(new Error("received unexpected error: " + err.message))
      })
  })
})
