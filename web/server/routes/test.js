// /api/test
const router = require("express").Router();

const { Test, Price } = require("../models");

// crawler library
const axios = require("axios");
const cheerio = require("cheerio");
const { Op } = require("sequelize");

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));


router.post("/new", async (req, res) => {
    try {
        await Test.create(req.body);
        res.send({ isError: false });
    } catch (error) {
        res.send({ isError: true, error: error });
    }
});


router.post("/crawler", async (req, res) => {
    try {
        const resp = await axios?.get(
            'https://etherscan.io/'
        );

        const $ = cheerio.load(resp.data);
        const elements = $('.text-muted a');
        const elements2 = $('.text-muted span span');

        let info = [];

        // ethereum price, gas price
        elements.each((idx, el) => {
            info.push($(el).text());
        });
        // ethereum price percent
        elements2.each((idx, el) => {
            info.push($(el).text());
        });

        // 가장 최근의 price
        const nowPriceId = (await Price.findOne({
            limit: 1,
            order: [['createdAt', 'DESC']],
        }))?.dataValues?.id;

        // 만약 가격 정보가 100개 이상이면 번호가 낮은 50개 삭제
        if ((await Price.findAll()).length > 100) {
            await Price.destroy({
                where: {
                    // 마지막 항목의 -50보다 작으면 삭제
                    id: { [Op.lt]: nowPriceId - 50 },
                }
            });
        }
        // 만약 마지막 항목이 자기 자신과 같으면 추가 안하도록 설정하기
        await Price?.create({
            ethereum: info[0],
            gas: info[1],
        });

        res.send(info);
    } catch (error) {
        console.error(error);
    }
});


router.post("/getBalance", async (req, res) => {
    const account = req.body.account;

    const balance = (await web3.eth.getBalance(account)) / Math.pow(10, 18);
    res.send(`${balance}`);
});


module.exports = router;