const { Transaction, Block } = require("../models");

// api/transaction
const router = require("express").Router();

// api/transaction/latest 
router.post("/latest", async (req, res) => {
    let transactions = [];
    // 최신 6개 트랜잭션
    transactions = await Transaction.findAll({
        limit: 6,
        // 관계가 있는 놈 테이블까지 같이 불러옴
        include: { model: Block },
        order: [["id", "DESC"]]
    });
    res.send(transactions);
});

// 트랜잭션 상세 정보
router.post("/info", async (req, res) => {
    const hash = req.body.hash;
    const txInfo = (await Transaction.findOne({
        hash: hash
    })).dataValues;
    res.send(txInfo);
});

// 해당 유저(계좌)와 관련된 트랜잭션
router.post("/account", async (req, res) => {

    const account = req.body.account;

    const from = await Transaction.findAll({
        // include: { model: Block, as: "BlockTransactions" },
        where: {
            from: account
        },
        order: [["blockNumber", "DESC"]]
    });
    const to = await Transaction.findAll({
        // include: { model: Block, as: "BlockTransactions" },
        where: {
            to: account
        },
        order: [["blockNumber", "DESC"]]
    });

    let result = { from: [from], to: [to] };
    res.send(result);

});

// 모든 트랜잭션 개수
router.post("/allCount", async (req, res) => {

    // id를 desc로 정렬하여 limit 한개
    const count = (await Transaction.findOne({
        order: [["id", "DESC"]],
    })).id;

    res.send(`${count}`);
});

// 해당 페이지의 모든 트랜잭션
router.post("/allTransaction", async (req, res) => {
    const page = req.body.page;

    // 10개의 최신 트랜잭션
    const transactions = await Transaction.findAll({
        include: Block,
        limit: 10,
        offset: (10 * page) - 10,
        order: [["updatedAt", "DESC"]]
    });

    res.send(transactions);
});



module.exports = router;