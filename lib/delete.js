'use strict';
const database = require(__dirname + '/database.js')

const del = (filter, collection) => {
  return new Promise((resolve, reject) => {
    reject(new Error("not implemented"))
  })
}

// exports
module.exports.delete = del

