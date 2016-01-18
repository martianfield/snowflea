'use strict';

const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
chai.use(chai_as_promised);

const should = chai.should();
const expect = chai.expect;
const snowflea = require(__dirname + '/../index.js');


describe("Read", () => {
  snowflea.database.set('uri', 'mongodb://localhost:27017/test');
  let collection = 'snowflea_test_read';
  let created_items = [];
  before(() => {
    return snowflea.deleteAll(collection)
      .then((count) => {
        return snowflea.createMany(collection, [
          {"name": "Bonnie", "age": 24},
          {"name": "Connie", "age": 22},
          {"name": "Annie", "age": 24}
        ]);
      })
      .then((items) => {
        created_items = items;
      })
      .catch((err) => {
        console.log("ERROR:", err.message);
      });
  });
  after(() => {
    snowflea.deleteAll(collection)
      .then((count) => {})
      .catch((err) => { console.log("Error:", err.message )})
  });

  it(('readAll()'), () => {
    return snowflea.readAll(collection).should.eventually.have.length(3);
  });

  it(('readAll() with limit'), () => {
    let options = { limit: 2 };
    return snowflea.readAll(collection, options).should.eventually.have.length(2);
  });

  it(('readAll() with sort ASC'), () => {
    let sort = {'name': snowflea.sort.ASC };
    let options = { sort: sort};
    snowflea.readAll(collection, options).should.eventually.satisfy((results) => results[0].name === 'Annie');
  });

  it(('readOne()'), () => {
    let name = created_items[0].name;
    return snowflea.readOne(collection).should.eventually.satisfy((result) => result.name === name);
  });

  it(('readOne() with sort ASC'), () => {
    let options = {};
    options.sort = {'name': snowflea.sort.ASC };
    return snowflea.readOne(collection, options).should.eventually.satisfy((result) => result.name === 'Annie');
  });

  it(('readOneById()'), () => {
    let id = created_items[0]._id;
    let name = created_items[0].name;
    snowflea.readOneById(collection, id).should.eventually.satisfy((result) => result.name === name);
  })
});
