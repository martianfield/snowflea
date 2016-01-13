'use strict';
const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
chai.use(chai_as_promised);

const should = chai.should();
const expect = chai.expect;
const snowflea = require(__dirname + '/../index.js');
const database = require(__dirname + '/../lib/database.js');



describe("Read", () => {
  let created_items = [];
  before(() => {
    database.set('uri', 'mongodb://localhost:27017/test');
    return snowflea.deleteAll('snowflea_test_read')
      .then((count) => {
        return snowflea.createMany('snowflea_test_read', [
          {"name": "Pip"},
          {"name": "Pop"},
          {"name": "Pap"}
        ]);
      })
      .then((items) => {
        created_items = items;
      })
      .catch((err) => {
        console.log("ERROR:", err.message);
      });
  });

  it(('readAll()'), () => {
    return snowflea.readAll('snowflea_test_read').should.eventually.have.length(3);
  });

  it(('readOne()'), () => {
    // TODO
  })
});
