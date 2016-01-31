'use strict';
const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const snowflea = require(__dirname + '/../index.js')

describe('Update', () => {
  let schema
  before((done) => {
    snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')
    schema = new snowflea.Schema(
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
    schema.create(objs)
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
    schema.update(filter, data)
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
    schema.update(filter, data)
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
    schema.update(filter, data, options)
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

    let data = {age:23}
    let options = {upsert:false, many:true}
    schema.update(filter, data, options)
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

  it('invalid data', (done) => {
    let filter = { name: 'Tom'}
    let data = { age: 'not an int'}

    schema.update(filter, data)
      .then(() => {
        done(new Error("this should never succeed"))
      })
      .catch(err => {
        done()
      })
  })

  // TODO test projecting data
  it('projecting data', (done) => {
    done()
  })

  it('upsert needs required fields', (done) => {
    let options = { upsert:true}
    let filter = {name:'does not exit'}
    let data = {age:12} // is missing the required 'name' field

    schema.update(filter, data, options)
      .then(() => {
        done(new Error("this should never succeed"))
      })
      .catch((err) => {
        // TODO might want to have a real look at the error here
        err.errors.length.should.equal(1)
        done()
      })
  })
})