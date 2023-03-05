const Sequelize = require("sequelize");

module.exports = class Block extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            hash: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: "",
                unique: true,
            },
            parentHash: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: "",
                unique: true,
            },
            miner: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: "",
            },
            transactionsRoot: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: "",
                unique: false, // 흠
            },
            number: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                unique: true,
            },
            difficulty: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            gasLimit: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            gasUsed: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            nonce: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: "",
            },
            size: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,
            },
            stateRoot: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: "",
            },
            timestamp: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            totalDifficulty: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,
            },
            receiptsRoot: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            sha3Uncles: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            mixHash: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            logsBloom: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            extraData: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: "Block", // js
            tableName: "block", // db
            paranoid: true, // deleteAt
            timestamps: true, // createdAt, updatedAt
            underscored: false, // camel은 camel으로
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }

    static associate(db) {

        // block 1 : transaction n
        db.Block.hasMany(db.Transaction, {
            as: "BlockTransactions",
            sourceKey: "hash",
            foreignKey: "blockHash"
        });

    }
}
// uncles(x), transactions(table)