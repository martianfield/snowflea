'use strict';
const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
chai.use(chai_as_promised);

const should = chai.should();
const expect = chai.expect;
const snowflea = require(__dirname + '/../index.js');

before(() => {
  console.log("Before");
  return snowflea.deleteAll('snowflea_test_read')
    .then((count) => {
      return snowflea.createMany('snowflea_test_read', [
        {"name": "Pip"},
        {"name": "Pop"},
        {"name": "Pap"}
      ]);
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
});

describe("read()", () => {
  it(('read all'), () => {
    return snowflea.readAll('snowflea_test_read').should.eventually.have.length(3);
  })
});
