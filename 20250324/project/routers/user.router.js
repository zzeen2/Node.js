const router = require("express").Router();
const usersController = require("../controllers/user.controller")

//-------------------------- 프론트
router.get("/login", (req,res)=> {
    res.render("user_page/login")
})

router.get('/signup', (req,res)=> {
    res.render("user_page/signup")
})

//-------------------------- 백엔드
router.post("/signup", async(req,res)=> {
    try {
        const {name, nick} = req.body
        const date = new Date();
        const data = await usersController.create(name, nick, date);
        res.json(data);
    } catch (error) {
        res.json ({state:400, message : error});
    }
})

// 조회를 하는데 자유게시판, 후기게시판 등등 
// /usersInfo/:params     >> params === 원하는 이름의 파라미터
// 쿼리스트링은 값이 없어도 요청 url의 처리가 가능 요청을 받을 수 있는데
// params값은 요청 경로에 추가해두면 무조건 /안으로 들어가야 요청을 받을 수 있다.
router.get("/usersInfo", async (req,res)=> {
    try {
        const data = await usersController.userSelectAll();
        res.json(data)
    } catch (error) {
        res.json({state:400, message : "유저 조회 컨트롤러 에러"})
    }
})

// 로그인페이지에서 본인인증하고 지금은 우리가 본인 pass 앱을 바로 사용할순 없으니 
// 본인인증이 있다고 가정하고
// 쿠키에 값 추가
router.post('/login', async(req,res)=> {
    try {
        const {name} = req.body;
        // 쿠기 생성
        //res.setHeader("set-cookie", "user=zzeen;"); << 이 방법도 있고, 아래 방법도있음\
        res.cookie("user", name, {
            maxAge : 10*60*60*1000,
            httpOnly : true
        })
        res.json({state:200, message : "로그인 성공"});
    } catch (error) {
        res.json({state:400, message : "로그인 실패"})
    }


})

module.exports = router;