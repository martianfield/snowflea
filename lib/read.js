'use strict'
const database = require(__dirname + '/database.js')
const project = require('iceworm').project
const utility = require(__dirname + '/../lib/utility.js')

const read = (filter, schema) => {

  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        let options = {
          fields:utility.getProjection(schema)
        }
        return db.collection(schema.options.collection).find(filter, options).toArray()
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

