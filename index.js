'use strict'

const iceworm = require('iceworm')

// setthings
module.exports.set = require('setthings').set
module.exports.settings = require('setthings').settings

// iceworm schema extension
const create_func = require(__dirname + '/lib/create.js')
const read_func = require(__dirname + '/lib/read.js')
const update_func = require(__dirname + '/lib/update.js')
const delete_func = require(__dirname + '/lib/delete.js')
const use = (schema, collection) => {
  if(schema.options === undefined) {
    schema.options = {}
  }
  schema.options.collection = collection
  schema.__proto__.create = (obj) => { return create_func(obj, schema) }
  schema.__proto__.read = (filter) => { return read_func(filter, schema) }
  schema.__proto__.update = (filter, data, options) => { return update_func(filter, data, options, schema) }
  schema.__proto__.delete = (filter) => { return delete_func(filter, schema) }
}
module.exports.use = use

// other
module.exports.drop = require(__dirname + '/lib/drop.js')

// crud functions
module.exports.create = create_func
module.exports.read = read_func
module.exports.update = update_func
module.exports.delete = delete_func

// If the Node process ends, close the db connection
const database = require(__dirname + '/lib/database.js')
process.on('SIGINT', function() {
  database.close(() => {
    process.exit(0)
  })
})
