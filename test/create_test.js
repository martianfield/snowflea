'use strict';
const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
chai.use(chai_as_promised);

const should = chai.should();
const expect = chai.expect;
const snowflea = require(__dirname + '/../index.js');
const database = require(__dirname + '/../lib/database.js');


describe("Create", () => {
  beforeEach(() => {
    database.set('uri', 'mongodb://localhost:27017/test');
    return snowflea.deleteAll('snowflea_test_read')
      .then((count) => {

      })
      .catch((err) => {
        console.log("ERROR:", err.message);
      });
  });

  it(('createOne()'), () => {
    let obj = { name: "Amy Pond", scottish:true };
    // create one
    snowflea.createOne('snowflea_test_read', obj)
      .then((obj) => {
        return snowflea.readAll('snowflea_test_read').should.eventually.have.length(1);
      });
    // create another
    snowflea.createOne('snowflea_test_read', obj)
      .then((obj) => {
        return snowflea.readAll('snowflea_test_read').should.eventually.have.length(2);
      });
  })

  it(('createMany()'), () => {
    let objs = [
      {"name":"first"},
      {"name":"second"}
    ];
    //
    snowflea.createMany('snowflea_test_read', objs)
      .then((objs) => {
        return objs.should.have.length(2);
      })
  });
});
