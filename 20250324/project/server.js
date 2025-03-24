// npm i express ejs dotenv mysql2 sequelize //> 팩제이슨에서 깔린거 확인할 수 있음
require("dotenv").config();
const express = require("express")
const {userRouter, mainRouter, boardRouter} = require("./routers") // index.js 알아서 찾아옴 

const app = express();
app.set("view engine" , "ejs"); // 요청들어올때 사용됨
app.use(express.json()); //** 
app.use(express.urlencoded({extended : false})); //**0

// 미들웨어 부분
app.use(mainRouter);
app.use("/user", userRouter); // /user/login, /user/signup 이렇게 요청 경로 넣어줄거니까 //> 시작점이 /user
app.use("/board", boardRouter); // 시작점이 /board 

app.listen( process.env.PORT || 3000, () => {
    console.log("server on")
})
