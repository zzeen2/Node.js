const router = require("express").Router();
const boardController = require("../controllers/board.controller")


router.get("/", (req,res)=> {
    res.render("board_page/main")
})

router.get("/create", (req,res)=> {
    res.render("board_page/create")
})

router.post('/create', async (req,res)=> {
    try {
        const {content,UserName} = req.body;
        //const cookie = req.header.cookie.split("=")[1]; // user=soon >> [user,soon]
        const data = await boardController.create(content, UserName);
        res.json({state: 200, message : "글 추가 성공"}, data)
    } catch (error) {
        res.json({state:400, message : "게시판 추가 컨트롤러 에ㄹ" })
    }
})
// 게시판 조회
router.get("/contentGetAll", async (req,res)=> {
    try {
        const data = await boardController.postSelectAll();
        res.json(data);
    } catch (error) {
     res.json({state:400, message :"게시글 조회 컨트롤러 에러"})   
    }
})

module.exports = router;
