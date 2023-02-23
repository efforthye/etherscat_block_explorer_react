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
        where: {
            from: account
        }
    });
    const to = await Transaction.findAll({
        where: {
            to: account
        }
    });

    let result = { from: [from], to: [to] };
    res.send(result);

    // res.end();
});



module.exports = router;