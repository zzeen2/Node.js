//npm i express ejs jsonwebtoken cookie-parser axios dotenv
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
// cookie값을 파싱해서 객체로 변환해준다. req.cookie에 객체값을 할당해준다.
// req.headers.cookie === user_token=123; 
// req.cookie === user_token=123; 파싱한 객체가 생성되어 저장됨
// {user_token : 123};


app.get("/kakao/login", (req,res)=> {
    const kakaoAuth = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}`
    res.redirect(kakaoAuth);
})

// 카카오의 인증 서버 로직 예시 
// app.get("/auth", (req,res)=> {
//     // 쿼리를 가지고 인가코드 생성
//     // 쿼리에서 redirect url 가져와
//     // 개발자에서 추가한 redirect_url이 맞는지 확인 이후에
//     // 리다이렉트 응답 보내준다.
//     res.redirect("http://localhost:3000/auth/kakao/callback?code=K23IukvXm_Rvtr4eUnH8aOkXckhvJgSL-J_a4mnOoQGa79RfxHdfegAAAAQKFyEtAAABldWMy_6nsOtctwzlGQ");
// })

app.get("/auth/kakao/callback", async (req,res)=> {
    const {code} = req.query;
    console.log(code); //> K23IukvXm_Rvtr4eUnH8aOkXckhvJgSL-J_a4mnOoQGa79RfxHdfegAAAAQKFyEtAAABldWMy_6nsOtctwzlGQ (인가코드)
    // 엑세스 토큰 요청. 왜? 카카오 api를 호출할때 사용해야한다. 액세스토큰이 즉 api를 호출할수있는 권한 허가
    // 동의 항목에 추가한 내용이 있는지도 확인
    
    //params 변수 정해진 내용을 전달
    const tokenUrl = `https://kauth.kakao.com/oauth/token`
    // 쿼리를 많이 사용하니까 
    // 내장 클래스를 사용해서 쿼리 문자열 생성
    const data = new URLSearchParams({
        grant_type : 'authorization_code',
        client_id : process.env.KAKAO_CLIENT_ID,
        redirect_uri : process.env.REDIRECT_URL,
        code : code,
        client_secret : process.env.KAKAO_CLIENT_SECRET_KEY
    })
    
    const response = await axios.post(tokenUrl, data, {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'

        }
    })
    //console.log(response);

    const {access_token} = response.data;

    // 유저정보 조회
    const {data: userData} = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers : {
            Authorization: `Bearer ${access_token}`
        }
    })
    console.log(userData);
    //jwt 
    const {id, properties} = userData;
    const token = jwt.sign({id, properties}, "jwt_key", {expiresIn : "1h"});

    res.cookie("login_access_token", token, {httpOnly : true, maxAge : 60*60*60*1000})
    res.cookie("kakao_access_token", access_token, {httpOnly : true, maxAge : 60*60*60*1000})
    res.redirect("/");
})

app.get("/", (req,res)=> {
    const {login_access_token} = req.cookies;
    if(login_access_token){
        const {properties} = jwt.verify(login_access_token, "jwt_key")
        res.render("main", {data : properties});
    }else {
        res.render('main', {data : null})
    }
})

// 서비스 종료- 탈퇴
app.get("/unlink", async (req,res)=> {
    try {
        const access_token = req.cookies.kakao_access_token;
        const data = await axios.post("https://kapi.kakao.com/v1/user/unlink", {}, {
            headers : {
                Authorization: `Bearer ${access_token}`
            }
        })
        res.clearCookie("login_access_token")
        res.clearCookie("kakao_access_token")
        res.redirect("/");
    } catch (error) {
        res.json(error)
    }
})

// 로그아웃
app.get("/logout",(req,res)=>{
    const redirect_kakao_logout = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.KAKAO_CLIENT_ID}&logout_redirect_uri=${process.env.LOGOUT_REDIRECT_URL}`;
    res.redirect(redirect_kakao_logout);

})

//로그아웃 콜백
app.get("/auth/kakao/logout/callback", (req,res)=> {
    res.clearCookie("login_access_token")
    res.clearCookie("kakao_access_token")
    res.redirect("/");
})

app.listen(3000, (req,res)=> {
    console.log("server on")
})
