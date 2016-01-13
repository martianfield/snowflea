'use strict';
const database = require(__dirname + '/database.js');

const readAll = (collection, options) => {
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

const readOne = (collection, filter) => {
  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        return db.collection(collection).find(filter).limit(1);
      })
      .then((cursor) => {
        return cursor.toArray();
      })
      .then((data) => {
        if(data.length === 0) {
          reject(new Error("not found"))
        }
        else {
          resolve(data[0]);
        }
      })
      .catch((err) => {
        reject(err);
      });
  })
};

const readOneById = (collection, id) => {
  const filter = {_id:id};
  return readOne(collection, filter);
}

// exports
module.exports.readAll = readAll;
module.exports.readOne = readOne;
module.exports.readOneById = readOneById;


