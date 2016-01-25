'use strict'

// iceworm
const iceworm = require('iceworm')
module.exports.Schema = iceworm.Schema

// setthings
module.exports.set = require('setthings').set
module.exports.settings = require('setthings').settings

// crud
module.exports.create = require(__dirname + '/lib/create.js')
module.exports.read = require(__dirname + '/lib/read.js')
module.exports.update = require(__dirname + '/lib/update.js')
module.exports.delete = require(__dirname + '/lib/delete.js')

module.exports.drop = require(__dirname + '/lib/drop.js')

// If the Node process ends, close the db connection
const database = require(__dirname + '/lib/database.js')
process.on('SIGINT', function() {
  database.close(() => {
    process.exit(0)
  })
})
