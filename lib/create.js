'use strict'
const database = require(__dirname + '/database.js')
const validate = require('iceworm').validate
const project = require('iceworm').project

const create = (obj, schema) => {

  return new Promise((resolve, reject) => {
    let objs = obj.constructor === Array ? obj : [obj]

    // validate against schema
    let validation_errors = []
    objs.forEach((obj) => {
      let validation = validate(obj, schema)
      if(!validation.valid) {
        validation_errors.push({obj:obj, errors:validation.errors})
      }
    })

    if(validation_errors.length > 0) {
      reject({message: 'Validation failed', errors: validation_errors})
    }
    else {
      // project the items
      let projectedObjs = []
      objs.forEach((item) => {
        projectedObjs.push(project(item, schema))
      })
      objs = projectedObjs
      // save them to the database
      database.connect()
        .then((db) => {
          return db.collection(schema.options.collection).insertMany(objs)
        })
        .then((result) => {
          resolve(result.ops)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}

module.exports = create
