const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`server running on ${port}`);
});

const sessionTime = 1000 * 60 * 30; // 30분
const sessionObj = {
    secret: "shin",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: sessionTime }),
    cookie: {
        maxAge: sessionTime,
    },
};
app.use(session(sessionObj));
app.use(bodyParser.json());

// rest api callback module
const LoginApi = require("./api/login");

// 로그인 체크용
app.use("/login/login", LoginApi.Login);
// 로그아웃
app.use("/login/logout", LoginApi.Logout);
// 유저정보 조회
app.use("/login/getUserInfo", LoginApi.getUserInfo);
