const router = require("express").Router();
const {upload} = require("../lib/image.upload")
const {createBoard, selectBoardAll, selecBoardIndex, editBoardIndex, deleteBoardIndex} = require('../controllers/board.controllers');
const { edit } = require("../models/board");

router.get('/main',(req,res) => {
    const datas = selectBoardAll();
    console.log(datas)
    res.render("main", {datas})
})

router.get('/write', (req,res)=> {
    res.render("write")
})

router.post("/write", upload.single("myimage"),(req,res)=> {
    createBoard(req);
    res.redirect('/main');
})

router.get("/detail", (req,res)=>{
    const data = selecBoardIndex(req.query.index)
    const index = req.query.index
    res.render("detail", {data, index});
})

router.get("/edit",(req,res)=> {
    const data = selecBoardIndex(req.query.index)
    const index = req.query.index
    res.render("edit",{data, index})
})

router.post("/edit", upload.single("editedImage"),(req,res)=> {
const index = req.query.index;
const newTitle=req.body.editedTitle
const newContent = req.body.editedContent
const newImgPath = "http://localhost:3000/image/" + req.file.filename;

editBoardIndex(index,newTitle,newContent,newImgPath);
res.redirect(`/detail?index=${index}`)
})

router.get("/delete", (req,res)=>{
    const index = req.query.index;
    deleteBoardIndex(index);
    res.redirect('main');
})
module.exports = router;