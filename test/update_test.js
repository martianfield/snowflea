'use strict';
const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const snowflea = require(__dirname + '/../index.js')

describe('Update', () => {
  let schema
  before((done) => {
    snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')
    schema = snowflea.Schema.create(
      {
        name: '*string',
        age : 'int'
      },
      {
        collection: 'snowflea_test_update'
      }
    )
    let objs = [
      {"name": "Tam", age: 20}, {"name": "Tom", age: 22}, {"name": "Tim", age: 22}
    ]
    snowflea.create(objs, schema)
      .then(() => {
        done()
      })
      .catch((err) => {
        done(new Error(err.message))
      })
  })
  after((done) => {
    snowflea.drop(schema.options.collection)
      .then(() => {
        done()
      })
      .catch((err) => {
        done(new Error("Unexepcted Error:", err.message))
      })
  })

  it('update one', (done) => {
    let filter = {name:'Tam'}
    let data = {name:'TAM'}
    snowflea.update(filter, data, schema)
      .then((result) => {
        result.matchedCount.should.equal(1)
        result.modifiedCount.should.equal(1)
        result.upsertedCount.should.equal(0)
        done()
      })
      .catch((err) => {
        done(new Error("Unexepcted Error:", err.message))
      })
  })

  it('update none', (done) => {
    let filter = { name: 'Sam'}
    let data = {name : 'Sim'}
    snowflea.update(filter, data, schema)
      .then((result) => {
        result.matchedCount.should.equal(0)
        result.modifiedCount.should.equal(0)
        result.upsertedCount.should.equal(0)
        done()
      })
      .catch((err) => {
        done(new Error("Unexepcted Error:", err.message))
      })
  })

  it('upsert one', (done) => {
    let filter = { name: 'Sam'}
    let data = {name : 'Sam'}
    let options = {upsert:true, many: false}
    snowflea.update(filter, data, schema, options)
      .then((result) => {
        result.matchedCount.should.equal(1)
        result.modifiedCount.should.equal(0)
        result.upsertedCount.should.equal(1)
        done()
      })
      .catch((err) => {
        done(new Error("Unexepcted Error:", err.message))
      })
  })

  it('update many', (done) => {
    let filter = { age: 22}
    let data = {$set: {age: 23}}
    let options = {upsert:false, many:true}
    snowflea.update(filter, data, schema, options)
      .then(result => {
        result.matchedCount.should.equal(2)
        result.modifiedCount.should.equal(2)
        result.upsertedCount.should.equal(0)
        done()
      })
      .catch(err => {
        done(new Error("Unexepcted Error:", err.message))
      })
  })

  // TODO check for validation errors (waiting for Iceworm to implement update validation, e.g. ignoring required field validation)
  /*
  it('invalid data', (done) => {
    let filter = { name: 'Tom'}
    let data = { age: 'not an int'}

  })
  */
})