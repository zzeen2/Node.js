const { create, select, selectAll, edit, contentDelete } = require("../models/board");

// create 
const createBoard = (req) => {
    console.log(req.body)
    console.log(req.file)
    const {title,content} = req.body;
    const{filename} = req.file;
    const imgName = "http://localhost:3000/image/" + filename;

    create(title, content, imgName, filename)
}

// 전체 목록 
const selectBoardAll = ()=> {
    return selectAll();
}

// 선택 게시글
const selecBoardIndex =(index)=> {
    return select(index);
}  

//글 수정
const editBoardIndex =(index,newTitle,newContent,newImgPath) => {
    edit(index,newTitle,newContent,newImgPath);
}

// 글 삭제
const deleteBoardIndex =(index)=> {
    contentDelete(index);
}
module.exports={createBoard, selectBoardAll, selecBoardIndex, editBoardIndex, deleteBoardIndex}