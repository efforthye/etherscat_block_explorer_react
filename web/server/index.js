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
const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8082"));
web3.eth.subscribe("newBlockHeaders", (error, result) => {
    if (!error) {
        console.log(result);
    }
});

// router : cors를 설정한 이후에 적용
app.use("/api", routes);

// database
db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log("DB 연결됨");
    })
    .catch((err) => {
        console.log(err);
    });

// 8080 express server open
app.listen(app.get("port"), () => {
    console.log(`${app.get("port")} 서버를 열였습니다.`);
});