const router = require('express').Router();
const {signup, login} = require('../controllers/user.controller');//{signup}
// 요청 경로는 /user/

//GET /login HTTP/2.2
// 로그인페이지
router.get('/login', (req,res) => {
    res.render('user/index');
})

// user/signup
router.get('/signup',(req,res)=> {
    res.render('user/signup')
})

//POST /login HTTP/2.2
// page 보여주는 역할이 아님 로직부분만 재요청 응답처리
// 로그인 로직 작성
router.post('user/login', (req,res)=> {
    login(req,res);
})

// 회원가입 로직 작성
// user/signup
router.post('/signup', (req,res)=> {
    signup(req,res);
})

module.exports = router;