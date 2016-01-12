'use strict';

module.exports.createMany = require(__dirname + '/lib/create.js').createMany;
module.exports.readAll = require(__dirname + '/lib/read.js').readAll;
//module.exports.update = require(__dirname + '/lib/update.js');
module.exports.deleteOne = require(__dirname + '/lib/delete.js').deleteOne;
module.exports.deleteAll = require(__dirname + '/lib/delete.js').deleteAll;


