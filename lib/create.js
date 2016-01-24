'use strict'
const database = require(__dirname + '/database.js');

const create = (obj, schema) => {
  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        let objs = obj.constructor === Array ? obj : [obj]
        return db.collection(schema.options.collection).insertMany(objs)
      })
      .then((result) => {
        resolve(result.ops)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = create
