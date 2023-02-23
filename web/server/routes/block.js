const router = require("express").Router();

// web3 geth 서버
const Web3 = require("web3");
const { Block, Wallet, Transaction } = require("../models");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));

// 웹소켓
const web3Socket = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8082"));


// 웹소켓
web3Socket.eth.subscribe("newBlockHeaders", async (error, data) => {
    if (!error) {

        // 블록 가져옴
        const block = await web3.eth.getBlock(data.number);
        // 트랜잭션들
        const transactions = block.transactions;

        // db에 바로 넣기
        // insert Block
        const createdBlock = await Block.create({ ...block });
        // select Wallet
        const wallet = await Wallet.findOne({
            where: {
                account: data.miner
            }
        });

        // add where connected
        await wallet.addWalletBlocks(createdBlock);


        // 트랜잭션 배열 for문 돌려서 값 가져와 DB 저장
        for (let i = 0; i < transactions.length; i++) {
            const transaction = await web3.eth.getTransaction(transactions[i]);
            const createTx = await Transaction.create({ ...transaction });

            // 연결된 곳에도 추가
            createdBlock.addBlockTransactions(createTx);
        }

        // 다 넣어 졌으면 프론트 쪽으로 웹소켓 요청을 보내 리랜더링 한다. -> 안해도 됨

    } else {
        console.log('Error:', error);
    }
}).on("data", function (transaction) {
    console.log(transaction);
});


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
    const blocks = await Block.findAll({
        limit: 6,
        order: [["number", "DESC"]]
    });

    res.send(blocks);
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
        offset: (20 * page) - 20,
        order: [["number", "DESC"]]
    });

    res.send(blocks);
});


module.exports = router;