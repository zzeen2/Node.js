const router = require("express").Router();
const {adminMiddleware} = require("./middleWare")
const categoryController = require('../controllers/category.controller')

router.get("/category", adminMiddleware, async (req,res)=> {
    if(!req.admin) return res.json({state:403, message : "어드민 계정 검증 실패"});
    const {index} = req.query;
    const categoryData = await categoryController.selectAllPageNation(index);
    console.log(categoryData);
    const data = categoryData.data?.map((el)=> el.dataValues);
    console.log(data);
    res.render("admin/category", {data :categoryData.data, count : categoryData.count});
})

module.exports = router;