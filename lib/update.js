'use strict';
const database = require(__dirname + '/database.js');
const validate = require('iceworm').validate
const project = require('iceworm').project
const merge = require('setthings').merge

const update = (filter, data, schema, options) => {
  return new Promise((resolve, reject) => {
    // merge options
    options = merge(options, {upsert:false, many: false})

    // validate against schema
    let validation = validate(data, schema, {ignoreRequired:options.upsert===false}) // ignoring required field validation is only disabled if upserts are disabled
    if(!validation.valid) {
      return reject({message: 'Validation failed', errors: validation.errors})
    }

    // project data
    data = project(data, schema)

    // use $set to enable insertMany
    data = {$set:data}



    // make sure we know what collection to use
    if(!schema.options.collection) {
      reject(new Error("no schema.options.collection provided"))
    }

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
