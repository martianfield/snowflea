'use strict'
const database = require(__dirname + '/database.js')
const project = require('iceworm').project
const utility = require(__dirname + '/../lib/utility.js')

const read = (filter, schema) => {

  return new Promise((resolve, reject) => {
    // make sure we know what collection to use
    if(!schema.options.collection) {
      reject(new Error("no options.collection provided"))
    }

    database.connect()
      .then((db) => {
        return db.collection(schema.options.collection)
          .find(filter)
          .project(utility.getProjection(schema))
          .toArray()
      })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = read


// TODO sorting
// TODO limiting
// TODO skipping