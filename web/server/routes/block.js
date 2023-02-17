const axios = require("axios");

const router = require("express").Router();

// web3 geth 서버
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));

// 마지막 블록의 정보
router.post("/info", async (req, res) => {

    // 총 블록 개수
    const newBlockNumber = await web3.eth.getBlockNumber();

    // 마지막 블록의 정보
    const blockInfo = await web3.eth.getBlock(newBlockNumber);

    res.send(blockInfo);
});


// 마지막 6개 블록
router.post("/latest", async (req, res) => {

    // 총 블록 개수
    const newBlockNumber = await web3.eth.getBlockNumber();

    // 최신 6개 블록
    let latestBlocks = [];
    for (let i = 0; i < 6; i++) {
        latestBlocks[i] = await web3.eth.getBlock(newBlockNumber - i);
    }

    res.send(latestBlocks);
});

module.exports = router;