'use strict';
const database = require(__dirname + '/database.js');
const validate = require('iceworm').validate
const project = require('iceworm').project

const update = (filter, data, schema, options) => {
  return new Promise((resolve, reject) => {
    // validate against schema
    let validation = validate(data, schema)
    if(!validation.valid) {
      return reject({message: 'Validation failed', errors: validation.errors})
    }


    // make sure we know what collection to use
    if(!schema.options.collection) {
      reject(new Error("no options.collection provided"))
    }
    // use default options if none were provided
    options = options === undefined ? { upsert:false, many: false} : options
    let o2 = {}
    o2.upsert = options.upsert === undefined ? false : options.upsert
    o2.many = options.many === undefined ? false : options.many
    options = o2

    database.connect()
      .then((db) => {
        let collection = db.collection(schema.options.collection)
        if(options.many) {
          return collection.updateMany(filter, data, { upsert: options.upsert})
        }
        else {
          return collection.updateOne(filter, data, { upsert: options.upsert})
        }
      })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(new Error(err.message))
      })

  })
}

// exports
module.exports = update


// TODO enable upserts
