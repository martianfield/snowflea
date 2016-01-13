'use strict';
const database = require(__dirname + '/database.js');

const createOne = (collection, item) => {
  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        return db.collection(collection).insertOne(item);
      })
      .then((result) => {
        resolve(result.ops[0]);
      })
      .catch((err) => {
        reject(err);
      })
  });
};

const createMany = (collection, items) => {
  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        return db.collection(collection).insertMany(items);
      })
      .then((result) => {
        resolve(result.ops);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// exports
module.exports.createMany = createMany;
module.exports.createOne = createOne;

