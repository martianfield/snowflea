'use strict'

const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const snowflea = require(__dirname + '/../index.js')
const Schema = require('iceworm').Schema

describe("Read", () => {
  let cat_schema
  let cats
  before((done) => {
    snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')
    cat_schema = new Schema(
      {
        name: '*string',
        age: 'int>0',
        secret: '-string'
      }
    )
    snowflea.use(cat_schema, 'snowflea_cats')
    snowflea.drop(cat_schema.options.collection)
      .then(() => {
        cat_schema.create([
          { name: 'Amy', age: 2, secret: 'lies about her age' },
          { name: 'Cassandra', age: 6, secret: 'has no secrets' }
        ])
      })
      .then((result) => {
        // TODO result is undefined
        cats = result
        done()
      })
      .catch((err) => {
        done(new Error("Unexpected Error:", err.message))
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

  it(('read (without filter)'), (done) => {
    cat_schema.read({})
      .then((result) => {
        expect(result.length).to.equal(2)
        done()
      })
      .catch((err) => { done(new Error(err.message)) })
  })

  it(('read (with filter)'), (done) => {
    cat_schema.read({"name": "Amy"})
      .then((result) => {
        expect(result.length).to.equal(1)
        done()
      })
      .catch((err) => { done(new Error(err.message)) })
  })

  it(('projection'), (done) => {
    cat_schema.read({"name": "Amy"})
      .then((result) => {
        let cat = result[0]
        cat.hasOwnProperty('name').should.equal(true)
        cat.hasOwnProperty('age').should.equal(true)
        cat.hasOwnProperty('secret').should.equal(false)
        done()
      })
      .catch((err) => { done(new Error(err.message)) })
  })
})
