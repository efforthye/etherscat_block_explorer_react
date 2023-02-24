// api/
const router = require("express").Router();

const test = require("./test.js");
const block = require("./block.js");
const transaction = require("./transaction.js");

router.use("/test", test);
router.use("/block", block);
router.use("/transaction", transaction);

module.exports = router;