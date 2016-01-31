'use strict'

const iceworm = require('iceworm')

// setthings
module.exports.set = require('setthings').set
module.exports.settings = require('setthings').settings

// iceworm Schema extension
const create_func = require(__dirname + '/lib/create.js')
const read_func = require(__dirname + '/lib/read.js')
const update_func = require(__dirname + '/lib/update.js')
const delete_func = require(__dirname + '/lib/delete.js')
class Schema extends iceworm.Schema {
  create(obj) { return create_func(obj, this) }
  read(filter) { return read_func(filter, this) }
  update(filter, data, options) { return update_func(filter, data, options, this) }
  delete(filter) { return delete_func(filter, this) }
}

module.exports.Schema = Schema

module.exports.drop = require(__dirname + '/lib/drop.js')

// If the Node process ends, close the db connection
const database = require(__dirname + '/lib/database.js')
process.on('SIGINT', function() {
  database.close(() => {
    process.exit(0)
  })
})
