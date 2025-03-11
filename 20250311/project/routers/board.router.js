const { create, getBoard } = require('../controllers/board.controller');

const router = require('express').Router();

router.get('/' , (req, res)=>{
    res.render('main');
})

router.get('/create' , (req, res)=>{
    res.render('create');
})

router.get('/view' , async (req, res)=>{
    const data = await getBoard();
    console.log(data);
    res.render('view', { data });
})


router.post('/create' , async (req, res)=>{
    try {
        const {titleValue, contentValue} = req.body;
        await create(titleValue, contentValue);
        res.json({state : 200, message : "글 작성 완료"});
    } catch (error) {
        res.json({state : 400, message : error});
    }
    // 서버가 종료되지 않고 모니터링을 통해서 운영 배포 수정
    // 
})


module.exports = router;