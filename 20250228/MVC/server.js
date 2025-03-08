const express = require("express");
const app = express();

const UserRouter = require('./routers/user.router');

app.set("view engine", "ejs")
//GET / HTTP/1.1

// body
app.use(express.urlencoded({extended : false}))
// body
//express.urlencoded({extended : false}) ===  반환값 : 함수
// 어떤 함수냐? 핸들러 함수
// 요청메세지가 발생했을때 최초로 호출
// app.use((req,res,next)=> {
//     //req안의 내용에서 body의 내용을 가지고
//     // JSON.parser
//     // body라는 키를 추가하면서
//     req.body = {}
//     next();
// })


app.use("/user", UserRouter)

app.listen(3000, () => {
    console.log('server on')
})