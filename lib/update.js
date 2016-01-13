'use strict';
const database = require(__dirname + '/database.js');

const updateOne = (collection, item) => {
  return new Promise((resolve, reject) => {
    reject(new Error("not implemented"));
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

