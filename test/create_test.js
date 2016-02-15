'use strict'

const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const snowflea = require(__dirname + '/../index.js')
const Schema = require('iceworm').Schema

describe("Create", () => {
  let cat_schema
  before(() => {
    snowflea.set('mongo.uri', 'mongodb://localhost:27017/test')
    let raw_schema = {
      name: '*string',
      age: 'int>0',
      secret: '-string'
    }
    cat_schema = new Schema(raw_schema)
    snowflea.use(cat_schema, 'snowflea_cats')
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

  it(('create()'), (done) => {
    return cat_schema.create({name: 'Tom', age: 3, secret: 'hates fish'})
      .then((result) => {
        expect(result.length).to.equal(1)
        expect(result[0]).to.have.property('_id')
        done()
      })
      .catch((err) => {
        done(new Error("received unexpected error: " + err.message))
      })
  })

  it('create (from schema)', (done) => {

    return cat_schema.create({name: 'Tom', age: 3, secret: 'hates fish'})
      .then((result) => {
        expect(result.length).to.equal(1)
        expect(result[0]).to.have.property('_id')
        done()
      })
      .catch((err) => {
        done(new Error("received unexpected error: " + err.message))
      })
  })

  it(('create() missing required'), (done) => {
    return cat_schema.create({age:3})
      .then((result) => {
        // this should never happen
        done(new Error('saved object that should not have been saved'))
      })
      .catch((err) => {
        // TODO need to have a better look at error object, once I finalized what the error object should look like
        done()
      })
  })

  it(('create() superfluous field'), (done) => {
    return cat_schema.create({name:"Amelia", superfluous:'something'})
      .then((result) => {
        expect(result[0]).to.not.have.property('superfluous')
        done()
      })
      .catch((err) => {
        done(new Error("received unexpected error: " + err.message))
      })
  })

  it(('create() typecasting number'), (done) => {
    return cat_schema.create({name:"Amelia", age:'12'})
      .then((result) => {
        expect(typeof result[0].age).to.equal('number')
        done()
      })
      .catch((err) => {
        done(new Error("received unexpected error: " + err.message))
      })
  })
})
