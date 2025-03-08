//서버객체 생성
const express = require("express");
const boardRouter = require("./routers/board.router")
const app = express();

// 메서드와 경로에따라서 핸들로 함수를 호출하는 로직이 들어있다. 
// boardRouter: 핸들러 함수
// console.dir(boardRouter)

app.set("view engine", "ejs");
app.use("/board", boardRouter);

app.get ("/", (req,res)=> {
    res.render("main")
})

app.listen(3000,() => {
    console.log("server on~")
})