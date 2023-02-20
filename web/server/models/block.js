const Sequelize = require("sequelize");

module.exports = class Block extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 블록 해시
            hash: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            // 부모 블록의 해시 -> Block 연결
            parentHash: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            // 채굴한 사람 -> Wallet 연결
            miner: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            // 트랜잭션 루트 -> Transaction 연결
            transactionsRoot: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            // 블록 높이
            number: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                unique: true,
            },
            // 블록 난이도
            difficulty: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            // 가스 한도
            gasLimit: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            // 사용된 가스
            gasUsed: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            // 시도 횟수
            nonce: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            // 블록 크기
            size: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            // 블록의 상태
            stateRoot: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            // 생성시각
            timestamp: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            // 총 난이도
            totalDifficulty: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            // 그 외 데이터
            // 보상받은 ETH(새로 생성한 컬럼) 
            etherPrice: {
                type: Sequelize.STRING(100),
                allowNull: true,
                defaultValue: "0",
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

    static assciate(db) {

    }
}
// uncles(x), transactions table