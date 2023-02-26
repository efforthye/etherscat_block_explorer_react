const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

// database
const db = require("./models/index.js");
// cors
const cors = require("cors");
// router
const routes = require("./routes/index.js");
// web3
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));
// websocket
const websocket = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8082"));
// database for base insert...
const Wallet = require("./models/wallet.js");
const Block = require("./models/block.js");
const { Transaction } = require("./models/index.js");


dotenv.config();
const app = express();

app.set("port", process.env.PORT || 8080);

// cors
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    }),
);

app.use((req, res, next) => {
    if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
    else morgan("dev")(req, res, next);
});
// app.use(morgan("dev"));

app.use("/", express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET || "happyworld"));

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: "session-cookie",
    })
);

// 8082 websocket server open
websocket.eth.subscribe("newBlockHeaders", (error, result) => {
    if (!error) {
        // console.log(result);
        // 어찌 되었든, 감지를 하면 프론트 쪽으로 웹소켓을 보내야 하는듯??...
    }
});

// router : cors를 설정한 이후에 적용
app.use("/api", routes);


// database
db.sequelize.sync({ force: false }).then(async () => {
    console.log("DB 연결됨");

    // wallet 없으면 database 생성
    if (!(await Wallet.findOne({ where: { id: 1 } }))) {
        // transaction이 없으면 database 생성
        // if (!(await Transaction.findOne({ where: { id: 1 } }))) {
        // Wallet basedata insert
        web3.eth.getAccounts().then(async (accounts) => {
            // insert Wallet baseData
            for (let i = 0; i < accounts.length; i++) {
                await Wallet.findOrCreate({
                    where: { account: accounts[i] },
                });
            }
            // 모든 블록
            await web3.eth.getBlockNumber().then(async (num) => {
                for (let i = 1; i < num + 1; i++) {
                    // for (let i = 0; i < num; i++) {
                    // // insert Block baseData
                    await web3.eth.getBlock(i).then(async (data) => {
                        // insert Block
                        const createdBlock = await Block.create({ ...data });
                        // select Wallet
                        const wallet = await Wallet.findOne({
                            where: {
                                account: data.miner
                            }
                        });
                        // add where connected
                        // await wallet.addWalletBlocks(createdBlock);
                    });

                    // insert Transaction baseData
                    // n번째 블록의 트랜잭션 개수 출력
                    // console.log(await web3.eth.getBlockTransactionCount(i));
                    await web3.eth.getBlockTransactionCount(i, true, function (err, count) {
                        if (count > 0) {
                            // console.log(web3.eth.getBlock(i));
                            web3.eth.getBlock(i).then(async (blockInfo) => {

                                await web3.eth.getBlock(i).then(async (blockInfo) => {
                                    const transactions = blockInfo.transactions;
                                    for (let j = 0; j < transactions.length; j++) {
                                        // 트랜잭션 해시로 트랜잭션 검색
                                        await web3.eth.getTransaction(transactions[j]).then(async (transaction) => {
                                            // Transaction Create
                                            const createdTransaction = await Transaction.create({
                                                blockHash: transaction.blockHash,
                                                blockNumber: transaction.blockNumber,
                                                from: transaction.from,
                                                gas: transaction.gas,
                                                gasPrice: transaction.gasPrice.toString(10),
                                                hash: transaction.hash,
                                                input: transaction.input,
                                                nonce: transaction.nonce,
                                                to: transaction.to,
                                                // 한 블록의 트랜잭션 중 몇 번째인지
                                                transactionIndex: transaction.transactionIndex,
                                                value: transaction.value.toString(10),
                                                type: transaction.type,
                                                chainId: transaction.chainId,
                                                v: transaction.v,
                                                r: transaction.r,
                                                s: transaction.s,
                                            });

                                            // Block findOne (block(hash))
                                            // console.log(blockInfo.hash);
                                            const block = await Block.findOne({
                                                where: {
                                                    // hash: blockInfo.hash
                                                    hash: transaction.blockHash
                                                }
                                            });

                                            // method insert
                                            await block.addBlockTransactions(createdTransaction);

                                        }); // getTransaction end
                                    } // transactions for end
                                }); // getBlock for end
                            });
                        }// transaction count end
                    });
                }// block for end
            }); // getBlockNumber end
        }); // getAccounts end 
    } else {
        console.log("Data 있음");
    }
}).catch((err) => {
    console.log(err);
});


// 8080 express server open
app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} 서버를 열였습니다.`);
});