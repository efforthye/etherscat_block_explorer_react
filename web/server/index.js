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
db.sequelize.sync({ force: true }).then(async () => {
    console.log("DB 연결됨");
    // Wallet basedata insert
    web3.eth.getAccounts().then(async (accounts) => {
        for (let i = 0; i < accounts.length; i++) {
            await Wallet.findOrCreate({
                where: { account: accounts[i] },
            });
        }
        // Block basedata insert
        web3.eth.getBlockNumber().then((num) => {
            for (let i = 1; i < num; i++) {
                web3.eth.getBlock(i).then(async (data) => {
                    // Insert Block
                    const createdBlock = await Block.create({
                        hash: data.hash,
                        difficulty: data.difficulty,
                        extraData: data.extraData,
                        gasLimit: data.gasLimit,
                        gasUsed: data.gasUsed,
                        // hash: data.hash,
                        logsBloom: data.logsBloom,
                        miner: data.miner,
                        mixHash: data.mixHash,
                        nonce: data.nonce,
                        number: data.number,
                        parentHash: data.parentHash,
                        receiptsRoot: data.receiptsRoot,
                        sha3Uncles: data.sha3Uncles,
                        size: data.size,
                        stateRoot: data.stateRoot,
                        timestamp: data.timestamp,
                        totalDifficulty: data.totalDifficulty,
                        transactionsRoot: data.transactionsRoot,
                    });
                    // Select Wallet
                    const wallet = await Wallet.findOne({
                        where: {
                            account: data.miner
                        }
                    });
                    // Block Add Wallet
                    await wallet.addWalletBlocks(createdBlock);
                });
            }
        });
    });
}).catch((err) => {
    console.log(err);
});




// 8080 express server open
app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} 서버를 열였습니다.`);
});