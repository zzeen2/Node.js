const router = require("express").Router();
const userController = require("../controllers/user.controller")
const {authMiddleWare} = require("./middleWare")
const jwt = require("jsonwebtoken")

router.get('/login', (req,res) => {
    res.render("user_page/login")
})

router.get('/signup',(req,res)=> {
    res.render("user_page/signup")
})


//////

router.get('/userVerify', (req,res)=>{ // 화면을 그리는 목적이 아닌 데이터를 받기위한 라우터, axios한테 html 자체를 받는게 아니고 자스로 동적인 요청을 받기 위한것이기 때문에 
    // 오로지 데이터 검증을 하기 위함!!
    if(req.headers.cookie)
    {
        const user = req.headers.cookie.split("=")[1];
        const decoded = jwt.verify(user,process.env.SECRET_KEY);
        if(decoded) {
            req.user = decoded;
            res.json({state: 200 , data : {user : req.user}})
        }else{
            res.json({state:400, message : "유저 검증 실패"})
        }
    }else {
        res.json({state:400, message : "토큰이 없습니다."})
    }
})

router.post("/signup",async (req,res)=>{
    const {uidValue, upwValue, unameValue} = req.body;
    //console.log({uidValue, upwValue, unameValue})
    const data = await userController.signup(uidValue, upwValue, unameValue);
    res.json(data);
})

router.post("/login", async(req,res) => {
    try {
        const {uidValue, upwValue} = req.body;
    
        const {token, message, state} = await userController.login(uidValue,upwValue);
        if(state===402) return res.json({message,state})
        if(!token) return ({state:400, message : "일치하는 유저 없어"})
        res.cookie("user-token", token, {
            maxAge : 10 * 60 * 60 *1000,
            httpOnly : true
        })

        res.json({state, message })
        
    } catch (error) {
        res.json(error);
    }
})

router.get("/logout", (req,res)=> {
    res.clearCookie("user_token"); 
    res.redirect("/");
})
module.exports = router;
