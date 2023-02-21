const { Transaction } = require("../models");

// api/transaction
const router = require("express").Router();

// api/transaction/latest 
router.post("/latest", async (req, res) => {
    console.log(req.body);

    // 최신 6개 트랜잭션
    let allTransactions = [await Transaction.findAll()].reverse();
    let transactions = [];

    for (let i = 0; i < 6; i++) {
        if (allTransactions[i]) {
            transactions.push(allTransactions[i]);
        }
    }
    console.log(transactions[0]);
    res.send(transactions[0]);
});

module.exports = router;