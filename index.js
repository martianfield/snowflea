'use strict'

const database = require(__dirname + '/lib/database.js')

// iceworm
const iceworm = require('iceworm')
module.exports.Schema = iceworm.Schema

// setthings
module.exports.set = require('setthings').set
module.exports.settings = require('setthings').settings

// crud
module.exports.create = require(__dirname + '/lib/create.js')
/*
module.exports.createOne = require(__dirname + '/lib/create.js').createOne;
module.exports.createMany = require(__dirname + '/lib/create.js').createMany;
module.exports.readAll = require(__dirname + '/lib/read.js').readAll;
module.exports.readOne = require(__dirname + '/lib/read.js').readOne;
module.exports.readOneById = require(__dirname + '/lib/read.js').readOneById;
module.exports.updateOne = require(__dirname + '/lib/update.js').updateOne;
module.exports.updateMany = require(__dirname + '/lib/update.js').updateMany;
module.exports.deleteOne = require(__dirname + '/lib/delete.js').deleteOne;
module.exports.deleteAll = require(__dirname + '/lib/delete.js').deleteAll;

module.exports.sort = require(__dirname + '/lib/sort.js');
module.exports.database = require(__dirname + '/lib/database.js')
*/

// If the Node process ends, close the db connection
process.on('SIGINT', function() {
  database.close(() => {
    process.exit(0)
  })
})
