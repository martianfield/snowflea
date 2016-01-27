'use strict'

const database = require(__dirname + '/database.js')

const del = (filter, schema) => {
  return new Promise((resolve, reject) => {
    // make sure we know what collection to use
    if(!schema.options.collection) {
      reject(new Error("no options.collection provided"))
    }
    database.connect()
      .then((db) => {
        return db.collection(schema.options.collection).deleteMany(filter)
      })
      .then((result) => {
        resolve({"count":result.deletedCount})
      })
      .catch((err) => {
        reject(new Error(err.message))
      })
  })
}

// exports
module.exports = del

