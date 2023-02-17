const Sequelize = require("sequelize");
module.exports = class Test extends Sequelize.Model {
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
            modelName: "Test",
            tableName: "test",
            paranoid: true,
            underscored: true,
            timestamps: true,
        });
    }
}