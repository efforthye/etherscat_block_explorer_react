const Sequelize = require("sequelize");

module.exports = class Transaction extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            transactionIndex: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            chainId: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            hash: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            blockHash: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            blockNumber: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            gas: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            gasPrice: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            input: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            nonce: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            value: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            r: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            s: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            v: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            from: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            to: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

        }, {
            sequelize,
            modelName: "Transaction",
            tableName: "transaction",
            paranoid: true,
            timestamps: true,
            underscored: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }

    static associate(db) {

        // block 1 : transaction n
        db.Transaction.belongsTo(db.Block, {
            foreignKey: "blockHash",
            targetKey: "hash"
        });

    }
}