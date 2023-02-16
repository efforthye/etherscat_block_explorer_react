// 블록에 맞게 해시 등의 컬럼 지정해주기

const Sequelize = require("sequelize");
module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(100),
            },
            text: {
                type: Sequelize.TEXT,
            },
        }, {
            sequelize,
            modelName: "Board",
            tableName: "board",
            paranoid: true,
            underscored: true,
            timestamps: true,
        });
    }
}