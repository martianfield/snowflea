'use strict';
const database = require(__dirname + '/database.js');

// TODO upserts are not supported

const updateOne = (collection, filter, data) => {
  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        console.log("A")
        return db.collection(collection).updateOne(filter, data)
      })
      .then((result) => {
        console.log("B")
        resolve(result)
      })
      .catch((err) => {
        console.log("C")
        reject(err)
      })
  });
};

const updateMany = (collection, items) => {
  return new Promise((resolve, reject) => {
    reject(new Error("not implemented"));
  });
};

// exports
module.exports.updateOne = updateOne;
module.exports.updateMany = updateMany;

