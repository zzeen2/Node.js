require("dotenv").config();
//require("./models/config") //> 데이터베이스 연결 확인, 테이블 생성 확인
const express = require("express");
const path = require("path")
const app = express();
const {userRouter, adminRouter, categoryRouter, postRouter} = require("./routers");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//app.use('/public', express.static(__dirname + "/public")) //> 방법 1
app.use('/public', express.static(path.join(__dirname, "public"))); //> 방법 2
//localhost:3000/public => 작업폴더 public 폴더까지
// '/public' << 요청경로

app.use("/user", userRouter); // /user/login << 이런식으로 /user가 메인 path 뒤에오는 경로가 서브 path
app.use("/admin", adminRouter);
app.use("/category", categoryRouter);
app.use("/board", postRouter);

//메인페이지
app.get('/', (req,res) => {
    res.render("main")
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("server on")
});