const { Transaction } = require("../models");

// api/transaction
const router = require("express").Router();

// api/transaction/latest 
router.post("/latest", async (req, res) => {
    let transactions = [];

    // 최신 6개 트랜잭션
    transactions = await Transaction.findAll({
        limit: 6,
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


module.exports = router;