'use strict';

const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
chai.use(chai_as_promised);

const should = chai.should();
const expect = chai.expect;
const snowflea = require(__dirname + '/../index.js');
const database = require(__dirname + '/../lib/database.js');

describe("Read", () => {
  let collection = 'snowflea_test_read';
  let created_items = [];
  before(() => {
    database.set('uri', 'mongodb://localhost:27017/test');
    return snowflea.deleteAll(collection)
      .then((count) => {
        return snowflea.createMany(collection, [
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
    return snowflea.readAll(collection).should.eventually.have.length(3);
  });

  it(('readAll() with limit'), () => {
    let options = { limit: 2 };
    return snowflea.readAll(collection, options).should.eventually.have.length(2);
  });

  it(('readAll() with sort'), () => {
    // TODO
  });

  it(('readOne()'), () => {
    let name = created_items[0].name;
    let filter = { name: name };
    return snowflea.readOne(collection, filter).should.eventually.have.property('name', name);
  });

  it(('readOneById()'), () => {
    let id = created_items[0]._id;
    let name = created_items[0].name;
    //return expect(snowflea.readOneById(collection,id)).to.eventually.have.property('name', name);
    return snowflea.readOneById(collection, id).should.eventually.have.property('name', name);
  })
});
