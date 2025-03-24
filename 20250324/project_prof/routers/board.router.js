const router = require('express').Router();
const boardController = require('../controllers/board.controller');

router.get('/', (req, res) => {
    res.render("board_page/main");
})

router.get('/create', (req, res) => {
    res.render("board_page/create");
})

////////////////// 데이터 로직

router.post('/create', async (req, res) => {
    try {
        const { content, userName } = req.body;
        // const userName =  req.headers.cookie.split("=")[1];
        const data = await boardController.create(content, userName)
    
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({state : 400, message : "게시판 추가 컨트롤러 에러"})
    }
})

router.get('/cotentGetAll', async (req, res) => {
    try { 
        const data = await boardController.postSelectAll();
        res.json(data);
    } catch (error) {
        res.json({state : 400, message : "게시글 조회 컨트롤러 에러"})
    }
})

module.exports = router;