// api/test/
const router = require("express").Router();

// database
const { Test } = require("../models");
// crawler library
const axios = require("axios");
const cheerio = require("cheerio");


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

// api/test/crawler
router.post("/crawler", async (req, res) => {

    const resp = await axios.get(
        'https://etherscan.io/'
    );

    const $ = cheerio.load(resp.data);
    const elements = $('.text-muted a');
    const elements2 = $('.text-muted span .text-danger');

    let hi = [];

    // ethereum price, gas price
    elements.each((idx, el) => {
        // console.log($(el).text());
        hi.push($(el).text());
    });
    // ethereum price percent
    elements2.each((idx, el) => {
        // console.log($(el).text());
        hi.push($(el).text());
    });

    res.send(hi);

});

module.exports = router;