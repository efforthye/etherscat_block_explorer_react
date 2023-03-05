const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// database
const Test = require("./test.js");
const Block = require("./block.js");
const Transaction = require("./transaction.js");
const Price = require("./price.js");
const db = { Test, Block, Transaction, Price };

let sequelize = new Sequelize(config.database, config.username, config.password, config);

// database
Test.init(sequelize);
Block.init(sequelize);
Transaction.init(sequelize);
Price.init(sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;