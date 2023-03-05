const Sequelize = require("sequelize");

module.exports = class Price extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 타입 number로 변경하기
            ethereum: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            },
            gas: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: ""
            }
        }, {
            sequelize,
            modelName: "Price",
            tableName: "price",
            timestamps: true,
            paranoid: false,
            underscored: false,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate(db) {

    }
}