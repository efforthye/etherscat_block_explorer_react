const router = require("express").Router();

// web3 geth 서버
const Web3 = require("web3");
const { Block } = require("../models");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));


// 해당 블록의 정보
router.post("/info", async (req, res) => {

    console.log(req.body.value);

    // 총 블록 개수
    // const newBlockNumber = await web3.eth.getBlockNumber();

    // 블록 정보
    const blockInfo = await web3.eth.getBlock(req.body.value);

    res.send(blockInfo);
});


// 마지막 6개 블록
router.post("/latest", async (req, res) => {

    // 총 블록 개수
    const newBlockNumber = await web3.eth.getBlockNumber();
    // const newBlockNumber2 = (await web3.eth.getBlock("latest")).number;

    // 최신 6개 블록
    let latestBlocks = [];

    // 최신 블록이 6개 미만이면 초기 블록만 리턴함 (개수 수정)
    if (newBlockNumber < 6) {
        latestBlocks[0] = await web3.eth.getBlock(0);
    } else {
        for (let i = 0; i < 6; i++) {
            latestBlocks[i] = await web3.eth.getBlock(newBlockNumber - i);
        }
    }

    res.send(latestBlocks);
});


// 총 블록 개수
router.post("/allCount", async (req, res) => {
    const count = await web3.eth.getBlockNumber();
    res.send(`${count}`);
});

// 해당 페이지의 모든 블록
router.post("/allBlock", async (req, res) => {
    const page = req.body.page;

    // 20개의 최신 블록
    const blocks = await Block.findAll({
        limit: 20,
        offset: 20 * page,
        order: [["number", "DESC"]]
    });

    res.send(blocks);
});


module.exports = router;