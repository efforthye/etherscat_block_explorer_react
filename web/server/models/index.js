'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// database
const Test = require("./test.js");
const Block = require("./block.js");
const Transaction = require("./transaction.js");
const Wallet = require("./wallet.js");
const db = { Test, Block, Transaction, Wallet };

let sequelize = new Sequelize(config.database, config.username, config.password, config);

// database
Test.init(sequelize);
Block.init(sequelize);
Transaction.init(sequelize);
Wallet.init(sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;