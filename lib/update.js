'use strict';
const database = require(__dirname + '/database.js');

const update = (obj, schema, options) => {
  return new Promise((resolve, reject) => {
    reject(new Error("not implemented"))
  })
}

// exports
module.exports.update = update


// TODO enable upserts
