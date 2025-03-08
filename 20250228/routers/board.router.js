const router =require('express').Router();

router.get('/', (req,res)=>{
    res.render("board")
})

// / board/create 요청을 하면
router.post('/create', (req,res) => {
    res.send("글작성 완료")
})
module.exports = router;