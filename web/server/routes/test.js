// api/test/
const router = require("express").Router();

// database
const { Test } = require("../models");

// api/test/new
router.post("/new", async (req, res) => {
    console.log(req.body); // 안 찍힘
    try {
        await Test.create(req.body);
        res.send({ isError: false });
    } catch (error) {
        res.send({ isError: true, error: error });
    }
});

module.exports = router;