'use strict'

const MongoClient = require('mongodb').MongoClient
const settings = require('setthings').settings

let connected_db

const connect = () => {
  return new Promise((resolve, reject) => {
    if(connected_db) {
      resolve(connected_db)
    }
    else {
      MongoClient.connect(settings.mongo.uri, function(err, db) {
        if(err) {
          reject(err)
        }
        else {
          connected_db = db
          resolve(connected_db)
        }
      })
    }
  })
}

const close = (callback) => {
  connected_db.close()
    .then(() => {
      connected_db = undefined
      callback()
    })
    .catch((err) => {
      console.error(err)
      connected_db = undefined
      callback()
    })

}

module.exports.connect = connect
module.exports.close = close