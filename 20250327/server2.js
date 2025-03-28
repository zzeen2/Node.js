require("dotenv").config(); // 환경변수 생성
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const axios = require("axios")
const jwt = require("jsonwebtoken");

const app = express();
app.set("view engine", "ejs")
app.use("/img", express.static(path.join(__dirname, "images"))); // localhost:3000/img => images 폴더까지 접근
// localhost:3000/img/kakao_login_mudium~
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cookieParser());

// 메인페이지
app.get("/", (req,res)=> {

})

// 로그인
// /kakao/login으로 get요청을 보내면(메인에서 로그인 버튼 눌렀을때) 실행할 코드, kakaoAuth로 리다이렉트 되면서 
app.get("/kakao/login", (req,res)=> {
    const kakaoAuth = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}`
    res.redirect(kakaoAuth);
})
