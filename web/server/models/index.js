'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// database
// const Block = require("./block.js");
// const Transaction = require("./transaction.js");
// const db = { Block, Transaction };
const Test = require("./test.js");
const db = { Test };

let sequelize = new Sequelize(config.database, config.username, config.password, config);

// database
// Transaction.init(sequelize);
// Block.init(sequelize);
Test.init(sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;