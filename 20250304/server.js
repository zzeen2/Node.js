
const express = require("express");
const app = express();
const boardRouter = require("./routers/board.router");
const path = require("path");

app.set("view engine", "ejs")

app.use('/public', express.static(path.join(__dirname, "public")))
app.use('/image', express.static(path.join(__dirname, "upload")))
app.use(express.urlencoded({extended : false}))
app.use(boardRouter)

app.listen (3000, ()=> {
    console.log("server on!")
})

