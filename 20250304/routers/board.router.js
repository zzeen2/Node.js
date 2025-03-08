const router = require("express").Router();
const {upload} = require('../lib/image.upload')
const {createBoard, selectBoardAll, selectBoardIndex} = require('../controllers/board.controller');
const { create } = require("../models/board");

// 게시글 추가
router.get('/', (req,res)=> {
    res.render('board');
})

// 목록 보여주는
router.get('/main', (req,res)=> {
    const board = selectBoardAll(); // 반환값 === 배열
    console.log(board)
    res.render('board_main', {board})
})

router.get('/detail', (req,res)=> {
    const board = selectBoardIndex(req.query.index);
    console.log(req.query)
    console.log(board)
    // 보여줄 글의 내용
    res.render("board_detail", {board});
})

// 기능 로직
router.post("/upload", upload.single("myimage"),(req,res)=> {
    //console.log(req.file)
    // 데이터를 저장
    createBoard(req);
    res.redirect('/main')
    res.send('업로드 완료')
})

module.exports = router;