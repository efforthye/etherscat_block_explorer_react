// api/transaction
const router = require("express").Router();

// api/transaction/latest : 마지막 트랜잭션 6개
router.post("/latest", (req, res) => {
    console.log(req.body);

    // 여기

    res.end();
});

module.exports = router;