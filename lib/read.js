'use strict'
const database = require(__dirname + '/database.js')
const project = require('iceworm').project

const read = (filter, schema) => {

  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        let options = {fields:getProjection(schema)}
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


function getProjection(schema) {
  let projection = {}
  for(let field in schema.fields) {
    if(schema.fields.hasOwnProperty(field)) {
      let fi = schema.fields[field]
      if(fi.hidden) {
        projection[fi.name] = 0
      }
    }
  }
  return projection
}

