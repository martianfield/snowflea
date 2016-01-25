'use strict'
const database = require(__dirname + '/database.js')

const drop = (collection) => {

  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        return db.collection(collection).drop()
      })
      .then((result) => {
        resolve(true)
      })
      .catch((err) => {
        if(err.code === 26) {
          // attempted to drop collection that does not exit ... mission accomplished, sort of ...
          resolve(true)
        }
        else {
          reject(err)
        }
      })
  })
}

module.exports = drop

