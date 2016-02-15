'use strict'

const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const snowflea = require(__dirname + '/../index.js')
const Schema = require('iceworm').Schema

describe("Delete", () => {
  let cat_schema
  before((done) => {
    snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')
    cat_schema = new Schema(
      {
        name: '*string'
      }
    )
    snowflea.use(cat_schema, 'snowflea_cats')
    let objs = [
      {"name": "Tam"}, {"name": "Tom"}, {"name": "Tim"}
    ]
    cat_schema.create(objs)
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
    return cat_schema.delete({"name":"Tam"})
      .then((result) => {
        result.count.should.equal(1)
        done()
      })
      .catch((err) => {
        done(new Error("received unexpected error: " + err.message))
      })
  })

  it("delete all", (done) => {
    cat_schema.delete({})
      .then((result) => {
        result.count.should.equal(2)
        done()
      })
      .catch((err) => {
        done(new Error("received unexpected error: " + err.message))
      })
  })
})
