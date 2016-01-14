'use strict'
const iceworm = require('iceworm');
const database = require(__dirname + '/database.js')

const readAll = (collection, options) => {
  let limit, sort, schema, filter = {}, single = false
  if(options) {
    limit = options.limit // TODO should only accept numbers
    sort = options.sort
    filter = options.filter ? options.filter : {}
    single = options.single ? options.single : false
    schema = options.schema
  }
  return new Promise((resolve, reject) => {
    database.connect()
      .then((db) => {
        return db.collection(collection).find(filter)
      })
      .then((cursor) => {
        return limit ? cursor.limit(limit) : cursor
      })
      .then((cursor) => {
        return sort ? cursor.sort(sort) : cursor
      })
      .then((cursor) => {
        return cursor.toArray()
      })
      .then((data) => {
        // patch against schema
        if(schema) {
          let patchedData = []
          data.forEach((obj) => {
            let patchedObj = iceworm.patch(obj, schema);
            patchedData.push(patchedObj);
          })
          data = patchedData
        }
        // return a single object (instead of an array) if requested
        if(single) {
          if(data.length === 0) {
            reject(new Error("not found")); // TODO should we not rather return undefined and let the consumer handle this?
          }
          else {
            resolve(data[0]);
          }
        }
        else {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const readOne = (collection, options) => {
  if(!options)
    options = {}
  options.limit = 1
  options.single = true
  return readAll(collection, options)
}

const readOneById = (collection, id) => {
  const options = {
    limit : 1,
    filter: {_id:id}
  }
  return readAll(collection, options)
}

// exports
module.exports.readAll = readAll;
module.exports.readOne = readOne;
module.exports.readOneById = readOneById;


