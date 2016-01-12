'use strict';
const database = require(__dirname + '/database.js');

const deleteOne = (collection, options) => {
  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        return db.collection(collection).find({});
      })
      .then((cursor) => {
        return cursor.toArray();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteAll = (collection) => {
  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        return db.collection(collection).deleteMany({});
      })
      .then((count) => {
        resolve(count);
      })
      .catch((err) => {
        reject(err);
      })
  });
};

// exports
module.exports.deleteOne = deleteOne;
module.exports.deleteAll = deleteAll;

