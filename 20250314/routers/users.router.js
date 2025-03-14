const router = require("express").Router();
const {upload} = require("../lib/imageUpload")
const {signup, login, loginToken} = require("../controllers/user.controller")
const {userSelectFromUid} =require("../models/user")


//-------------프론트
// 메인페이지
router.get('/main', loginToken, (req,res)=> {
    //const {uid, nick, imgpath} = req.user;
    //res.render('main', {uid, nick,imgpath})
})

router.get('/signup', (req,res)=> {
    res.render('signup');
})

router.get("/login", (req,res)=>{
    res.render('login');
})

router.get("/mypage", loginToken, (req,res)=>{
    const {uid, nick, imgpath} = req.user
    res.render("mypage", {uid, nick, imgpath} )
})




//-------------백엔드
router.post('/signup', upload.single('image'),async (req,res)=> {
    const {uid, upw, name, nick} = req.body;
    const {path} = req.file;
    const data = await signup(uid, upw,name, nick, "/" + path);
    console.log("data : ", data);
    res.json(data);
})

router.post('/login', async (req,res) =>{
    //console.log("req.body", req.body)
    const {uid, upw} = req.body;
    const data = await login(uid, upw);
    //console.log("서버", data);

    // 서버에서 유저에게 토근 발행해주기
    if (data.state === 200 ){
        const {token} = data.userToken;
        console.log(data.userToken);
        res.cookie("login-token", token,{
            maxAge: 10*60*60*1000,
            httpOnly : true
        })
        //res.json({state : 200, message : "토큰 성공"})
    }else {
        res.json({state:400, message : "실패"})
    }
    res.json(data);

})
module.exports = router;