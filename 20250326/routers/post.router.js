const categoryController = require("../controllers/category.controller");
const postController = require("../controllers/post.controller");
const { authMiddleWare } = require("./middleWare");

const router = require("express").Router();

router.get("/", (req,res)=> {
    res.render("board/main");
})

// /board/list/:params
// /board/list/:params?index=1&search="검색조건" << 이렇게 하는거 숙제
// params : 이미 정해져있는 리소스를 분류할때
// query string : 조회 혹은 페이지네이션 검색
router.get("/list/:category", async(req,res)=> {
    //console.log(req.params) //> { category: '1' }
    //console.log(req.query); //> { index: '1' }
    const {category} = req.params;
    const {data} = await postController.categoryPostSelectAll(category);
    let postData;
    if (data) {
        postData = data.map(el => el.dataValues)
    }
    console.log(data[0].dataValues);
    res.render('board/list', {data : postData});
})

router.get("/create", authMiddleWare, async (req,res)=> {
    const {data} = await categoryController.selectAll();
    console.log(data);
    const categoryData = data?.map(el => el.dataValues)
    console.log(categoryData);
    res.render("board/create", {categorys : categoryData});
})

router.post('/create', authMiddleWare , async(req,res)=>{
    const {name,uid} = req.user;
    const {category, title, content} = req.body;
    console.log({category, title, content})
    const data = await postController.create(category, title, content, name, uid)
    console.log(data);
    res.json(data);
})
module.exports = router;