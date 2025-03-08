const express = require('express');
const cors = require('cors');
const { signup } = require('./controllers/user.controller');
const { userFindUidUpw } = require('./models/user');
const app = express();

app.use(express.json()); // json형태로 body의 내용을 받아서
app.use(express.urlencoded({extended : false})); // express 요청객체에 body json 문자열을 body 객체로 파싱
app.use(cors({
    origin : "http://localhost:3000",
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true
}))
// 요청을 보낼때 쿠키 값을 포함하려면 credentials 검증의 속성이 활성화 되어야한다.


app.post('/login', (req, res) => {
    const {uid, upw} = req.body;
    console.log(req);
    console.log(uid, upw);
    const user = userFindUidUpw({uid, upw});
    if(user) {
        res.send({state : 200, message : "로그인 성공", token : `${uid} code`})
    } else {
        res.send({state : 400, message : "로그인 실패"})
    }
})

app.post('/signup', async (req, res) => {
   const data = await signup(req);
   res.send(data);
})

app.listen(4000, () => {
   console.log('backend server on~'); 
})