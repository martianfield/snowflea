'use strict'
const database = require(__dirname + '/database.js')

const readAll = (collection, options) => {
  let limit, sort, filter = {}, single = false
  if(options) {
    limit = options.limit; // TODO should only accept numbers
    sort = options.sort;
    filter = options.filter ? options.filter : {};
    single = options.single ? options.single : false;
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
        if(!single) {
          resolve(data)
        }
        else {
          if(data.length === 0) {
            reject(new Error("not found"))
          }
          else {
            resolve(data[0])
          }
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


