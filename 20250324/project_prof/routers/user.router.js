const router = require('express').Router();
const usersController = require('../controllers/user.controller'); 

router.get('/login', (req, res) => {
    res.render('user_page/login')
})

router.get('/signup', (req, res) => {
    res.render('user_page/signup');
})

//////////// 데이터 로직 처리

router.post('/signup', async (req, res) => {
    try {
        const {name, nick} = req.body;
        const date = new Date();
        const data = await usersController.create(name, nick, date);
        
        // 다른 로직이 에러
        res.json(data);
    } catch (error) {
        res.json({state : 400, message : "유저 생성 컨트롤러 에러"})
    }
})

// 조회를 하는데 자유게시판, 후기 게시판, 판매 게시판
// /usersInfo/:parmas    // parmas === 원하는 이름의 파라미터
// 쿼리 스트링은 값이 없어도 요청 url의 처리가 가능 요청을 받을수있는데
// 파라미터 params 값은 요청 경로에 추가해두면 무조건 들어가야 요청을 받을수 있다.
// /usersInfo/3  요청을 받을수 없다. 
router.get("/usersInfo", async (req, res) => {
    try {
        const data = await usersController.userSelectAll();
        res.json(data)
    } catch (error) {
        res.json({state : 400, message : "유저 조회 컨트롤러 에러"})
    }
})

// 로그인 페이지에서 본인인증하고 지금은 우리가 본인 pass 앱을 바로 사용할순 없으니
// 본인 인증이 있다고 가정하고
// 쿠키에 값 추가
router.post('/login', (req, res) => {
    try {
        const { name } = req.body;
        // 쿠키 생성
        // res.setHeader("set-cookie", "user=soon;");
        res.cookie("user", name, {
            maxAge : 10 * 60 * 60 * 1000,
            httpOnly : true
        })
        res.json({state : 200, message : "로그인 성공"});
    } catch (error) {
        res.json({state : 400, message : "로그인 실패"})
    }
})

module.exports = router;