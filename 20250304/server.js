
const express = require("express");
const app = express();
app.set("view engine", "ejs")
const path = require("path");

const boardRouter = require("./routers/board.router"); //라우터 가져오기


app.use('/public', express.static(path.join(__dirname, "public")))
app.use('/image', express.static(path.join(__dirname, "upload")))
app.use(express.urlencoded({extended : false}))
app.use(boardRouter)

app.listen (3000, ()=> {
    console.log("server on!")
})

