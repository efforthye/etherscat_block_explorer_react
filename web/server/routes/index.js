// api/
const router = require("express").Router();

const test = require("./test.js");
const block = require("./block.js");

router.use("/test", test);
router.use("/block", block);

module.exports = router;