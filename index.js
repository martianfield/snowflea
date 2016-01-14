'use strict';

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


