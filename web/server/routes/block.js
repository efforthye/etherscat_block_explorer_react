const router = require("express").Router();

const { Block, Transaction } = require("../models");

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));
const websocket = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8082"));

websocket.eth.subscribe("newBlockHeaders", async (error, data) => {
    if (!error) {
        console.log(data);

        const block = await web3.eth.getBlock(data.number);
        const blockTransactions = block.transactions;

        const createdBlock = await Block.create({ ...block });

        for (let i = 0; i < blockTransactions.length; i++) {
            const blockTransaction = await web3.eth.getTransaction(blockTransactions[i]);
            const createdTransaction = await Transaction.create({ ...blockTransaction });

            createdBlock.addBlockTransactions(createdTransaction);
        }

        // 다 넣어 졌으면 프론트 쪽으로 웹소켓 요청을 보내 리랜더링 한다.

    } else {
        console.log('Error:', error);
    }
}).on("data", function (transaction) {
    console.log(transaction);
});


router.post("/info", async (req, res) => {
    const blockInfo = await web3.eth.getBlock(req.body.value);
    res.send(blockInfo);
});


router.post("/latest", async (req, res) => {
    const blocks = await Block.findAll({
        limit: 6,
        include: { model: Transaction, as: "BlockTransactions" },
        order: [["number", "DESC"]]
    });

    res.send(blocks);
});


router.post("/allCount", async (req, res) => {
    const count = await web3.eth.getBlockNumber();
    res.send(`${count}`);
});


router.post("/pageBlock", async (req, res) => {
    const page = req.body.page;

    const blocks = await Block.findAll({
        limit: 20,
        offset: (20 * page) - 20,
        order: [["number", "DESC"]]
    });

    res.send(blocks);
});


module.exports = router;