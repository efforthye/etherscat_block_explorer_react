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

module.exports = router;