const axios = require("axios");

const router = require("express").Router();

// web3 geth 서버
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));

// 마지막 블록의 정보
router.post("/info", async (req, res) => {

    // 총 블록 개수
    const newBlockNumber = await web3.eth.getBlockNumber();
    console.log(newBlockNumber);

    // 블록 정보(블록 번호 또는 블록 해시)
    // for문 돌려서 최신 블록 6개 배열 보내기
    // 현재 가장 마지막 블록 정보 가져옴
    const blockInfo = await web3.eth.getBlock(newBlockNumber);

    res.send(blockInfo);
});

module.exports = router;