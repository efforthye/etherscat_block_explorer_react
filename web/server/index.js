const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

const db = require("./models/index.js");
const cors = require("cors");
const routes = require("./routes/index.js");

const Block = require("./models/block.js");
const { Transaction } = require("./models/index.js");

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 8080);

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    }),
);

app.use((req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        morgan("combined")(req, res, next);
    } else {
        morgan("dev")(req, res, next);
    }
});

app.use("/", express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET || "happyworld"));

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET || "happyworld",
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: "session-cookie",
    })
);

// router : cors 설정 이후 적용
app.use("/api", routes);


db.sequelize.sync({ force: true }).then(async () => {
    console.log("DB 연결됨");

    await web3.eth.getBlockNumber().then(async (num) => {

        for (let i = 1; i < num + 1; i++) {

            await web3.eth.getBlock(i).then(async (data) => {
                await Block.create({ ...data });
            });

            await web3.eth.getBlockTransactionCount(i).then((blockTransactionCount) => {

                if (blockTransactionCount > 0) {

                    web3.eth.getBlock(i).then(async (blockInfo) => {

                        const blockTransactions = blockInfo.transactions;

                        for (let j = 0; j < blockTransactions.length; j++) {

                            await web3.eth.getTransaction(blockTransactions[j]).then(async (transaction) => {

                                const createdTransaction = await Transaction.create({
                                    ...transaction,
                                    gasPrice: transaction.gasPrice.toString(10),
                                    value: transaction.value.toString(10),
                                });

                                const block = await Block.findOne({
                                    where: { hash: transaction.blockHash }
                                });

                                await block.addBlockTransactions(createdTransaction);

                            });
                        }
                    });
                }
            });
        }
    });
}).catch((err) => {
    console.log(err);
});


app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} 서버를 열였습니다.`);
});