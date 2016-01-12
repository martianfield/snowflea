'use strict';
const database = require(__dirname + '/database.js');

const read = (collection, options) => {
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

// exports
module.exports = read;

