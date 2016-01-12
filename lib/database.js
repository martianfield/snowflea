'use strict';
const MongoClient = require('mongodb').MongoClient;
let uri = 'mongodb://localhost:27017/test';
let db;

const connect = () => {
  if(!db) {
    db = MongoClient.connect(uri);
  }
  return db;
};

module.exports.connect = connect;