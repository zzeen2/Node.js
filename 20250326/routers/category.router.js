const router = require("express").Router();
const categoryController = require("../controllers/category.controller")
const {authMiddleWare} = require("../routers/middleWare")

router.post("/create", authMiddleWare, async(req,res)=> {
    const {name} = req.body;
    const {uid} = req.user;
    const data = await categoryController.create(name,uid)
    res.json(data);
})

module.exports = router;