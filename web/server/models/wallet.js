const Sequelize = require("sequelize");

module.exports = class Wallet extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            account: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
                // foreignKey : true,
            },
            userId: {
                type: Sequelize.STRING(50),
                allowNull: true,
                unique: true,
            },
            userPw: {
                type: Sequelize.STRING(50),
                allowNull: true,
                unique: false,
            },
        }, {
            sequelize,
            modelName: "Wallet", // js
            tableName: "wallet", // db
            paranoid: true, // deleteAt
            timestamps: true, // createdAt, updatedAt
            underscored: false, // camel은 camel으로
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }

    static associate(db) {

        // wallet 1 : block n
        db.Wallet.hasMany(db.Block, {
            as: "WalletBlocks", // addWalletBlocks
            sourceKey: "account",
            foreignKey: "walletAccount",
        });

        // wallet n : transaction n
        db.Wallet.belongsToMany(db.Transaction, {
            through: "userTransaction",
            as: "WalletTransaction", // addWalletTransaction
            foreignKey: "walletAccount",
            sourceKey: "account",
            onDelete: "cascade",
            // timestamps: true
        });

    }
}
// uncles(x), transactions table