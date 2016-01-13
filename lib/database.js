'use strict';
const MongoClient = require('mongodb').MongoClient;

let db;
const settings = {};

const set = (key, value) => {
  settings[key] = value;
};

const connect = () => {
  // TODO check if uri is set
  if(!db) {
    db = MongoClient.connect(settings.uri);
  }
  return db;
};

module.exports.connect = connect;
module.exports.set = set;
module.exports.settings = settings;