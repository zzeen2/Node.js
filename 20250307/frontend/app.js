const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require("cors");

const app = express();
app.use(cors({
    origin : "*",
    credentials : true
}))
app.use(express.json()); // json 형태의 문자열 사용 미들웨어
app.use(express.urlencoded({extended : false}));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "page"));

app.get('/', (req, res) => {
    res.render('main');
})

app.get('/login', (req, res) => {
    res.render('login');
}) 

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.get('/error', (req, res)=>{
    res.render('error')
})

app.post('/signup', async (req, res) => {
    const {uid, upw} = req.body;
    const {data} = await axios.post('http://127.0.0.1:4000/signup', {uid, upw})
    console.log(data);
    if(data.state === 200){
        res.redirect('/login');
    }else {
        res.redirect('/error');
    }
})

app.post('/login', async (req, res) => {
    const {uid, upw} = req.body;
    console.log(uid, upw);
    const { data } = await axios.post('http://127.0.0.1:4000/login', {uid, upw});
    console.log(data);
    // 헤더에 쿠키의 값을 저장해 라는 요청을 브라우저에게 응답
    // cookie 응답 헤더에 set Cookie라는 헤더 내용을 추가하면 브라우저에서 헤더를 읽었을때 쿠키 내용을 저장한다.
    res.cookie("login-token", data.token, {
        maxAge : 10 * 60 * 60 * 1000,
        httpOnly : true
    })
    // set cookie라는 헤더를 응답 메시지의 헤더로 추가
    // 쿠키 값을 생성 시킨다.
    // httpOnly 요청과 응답 간에만 쿠키의 값을 사용할수 있는 속성 자바스크립트에서 제어 X
    res.send("");
})

app.put('/login' ,(req, res) => {
    const {uid, upw} = req.body;
    console.log(uid, upw)
    res.send("")
})

app.listen(3000, () => {
    console.log('front server on~');
})
