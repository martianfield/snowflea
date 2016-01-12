'use strict';
const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
chai.use(chai_as_promised);

const should = chai.should();
const expect = chai.expect;
const snowflea = require(__dirname + '/../index.js');

describe("read()", () => {
  it(('read all'), () => {
    return snowflea.read('cats').should.eventually.have.length(4);
  })
});
