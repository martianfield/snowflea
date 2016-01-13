'use strict';
const database = require(__dirname + '/database.js');

const createOne = (collection, items) => {
  return new Promise((resolve, reject) => {
    reject(new Error("not implemented"));
  });
};

const createMany = (collection, items, options) => {
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

