const Sequelize = require("sequelize");

module.exports = class Price extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 컬럼들.다른 형식으로 변경하기.
            ethereum: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            gas: {
                type: Sequelize.STRING(20),
                allowNull: false,
            }
        }, {
            // db 설정
            sequelize,
            modelName: "Price", // js
            tableName: "price", // db
            timestamps: true, // createdAt, updatedAt
            paranoid: false, // deleteAt
            underscored: false, // camel은 camel으로
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        });
    }
    static associate(db) {

    }
}