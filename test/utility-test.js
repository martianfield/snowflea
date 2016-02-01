'use strict';
const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const Schema = require('iceworm').Schema
const snowflea = require(__dirname + '/../index.js')
const utility = require(__dirname + '/../lib/utility.js')

describe("utility", () => {

  it("getProjection", () => {
    let schema_raw = {
      name: '*string',
      age: 'int',
      scottish: '-*bool',
      amish: '-bool'
    }
    let schema = new Schema(schema_raw)

    expect(utility.getProjection(schema)).to.deep.equal({scottish:0, amish:0})

  })

})